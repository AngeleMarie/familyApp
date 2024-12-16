import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.sendStatus(403); // Forbidden if token is invalid or expired
        }

        const user = await User.findById(decoded.id); // Find user from the decoded token ID

        if (!user) {
            console.error('User not found for ID:', decoded.id);
            return res.sendStatus(404); 
        }

        req.user = user; 
        next(); 
    });
};
