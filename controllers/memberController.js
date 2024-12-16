const Member = require('../models/Member');
const nodemailer = require('nodemailer');


exports.inviteMember = async (req, res) => {
  const { fullname, email, message, relationship, invitedBy } = req.body;

  try {
    
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: 'Member already invited.' });
    }


    const newMember = new Member({ fullname, email, message, relationship, invitedBy });
    const savedMember = await newMember.save();


    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD 
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `You're Invited by ${invitedBy}`,
      html: `
        <h1>Hello ${fullname},</h1>
        <p>${invitedBy} has invited you to join their group as a ${relationship}.</p>
        <p>${message}</p>
        <p>Please accept the invitation to complete the process.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Invitation sent successfully', member: savedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ message: 'Member not found.' });

    member.status = status;
    await member.save();

    res.status(200).json({ message: 'Status updated successfully', member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
