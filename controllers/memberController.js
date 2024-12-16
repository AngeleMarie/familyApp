import Invite from '../models/Member.js';  
import transporter from '../config/emailConfig.js'; 


export const sendInvite = async (req, res) => {
  const { invitee, OTP, message, invitedBy } = req.body;

  try {
    
    const existingInvite = await Invite.findOne({ invitee });
    if (existingInvite) {
      return res.status(400).json({ message: 'Invite already sent to this email.' });
    }

    
    const otp = OTP || Math.floor(100000 + Math.random() * 900000).toString();  

    
    const invite = new Invite({
      invitee,
      OTP: otp,
      invitedBy,
      message,
    });

    
    const savedInvite = await invite.save();

    
    const mailOptions = {
      from: process.env.EMAIL,  
      to: invitee,
      subject: `Invitation from ${invitedBy}`,
      html: `
        <h1>Hello ${invitee},</h1>
        <p>You have been invited by ${invitedBy}.</p>
        <p>Message: ${message}</p>
        <p>Your OTP is: ${otp}</p>
        <p>Please use this OTP to complete the invitation process.</p>
      `,
    };

  
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Invitation sent successfully', invite: savedInvite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllInvites = async (req, res) => {
  try {
    const invites = await Invite.find();
    res.status(200).json(invites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const acceptInvite = async (req, res) => {
  const { id } = req.params;

  try {
    const invite = await Invite.findById(id);
    if (!invite) {
      return res.status(404).json({ message: 'Invite not found.' });
    }

    
    invite.status = 'accepted';
    await invite.save();

    
    const mailOptions = {
      from: process.env.EMAIL,
      to: invite.invitee,
      subject: `Your invite status has been updated`,
      html: `
        <h1>Invitation Status</h1>
        <p>Your invitation has been accepted by ${invite.invitedBy}.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Invite accepted successfully', invite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const rejectInvite = async (req, res) => {
  const { id } = req.params;

  try {
    const invite = await Invite.findById(id);
    if (!invite) {
      return res.status(404).json({ message: 'Invite not found.' });
    }

    invite.status = 'rejected';
    await invite.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: invite.invitee,
      subject: `Your invite status has been updated`,
      html: `
        <h1>Invitation Status</h1>
        <p>Your invitation has been rejected by ${invite.invitedBy}.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Invite rejected successfully', invite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateInviteStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;  

  try {
    const invite = await Invite.findById(id);
    if (!invite) {
      return res.status(404).json({ message: 'Invite not found.' });
    }

    invite.status = status;  // Update the status of the invite
    await invite.save();

    // Send a confirmation email after the invite is accepted or rejected
    const mailOptions = {
      from: process.env.EMAIL,  // Your email address
      to: invite.invitee,
      subject: `Your invite status has been updated`,
      html: `
        <h1>Invitation Status</h1>
        <p>Your invitation has been ${status} by ${invite.invitedBy}.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Invite ${status} successfully`, invite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
