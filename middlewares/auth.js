import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Ensure Authorization header exists and is in the correct format (Bearer token)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header is missing or malformed.' });
    }
    
    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

    if (!token) {
        return res.status(401).json({ message: 'Token missing' }); // Unauthorized if no token
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Token is invalid or expired' }); // Forbidden if token is invalid or expired
        }

        try {
            const user = await User.findById(decoded.id); // Find user by ID from the decoded token

            if (!user) {
                console.error('User not found for ID:', decoded.id);
                return res.status(404).json({ message: 'User not found' }); // Not Found if user does not exist
            }

            req.user = user; // Attach the user to the request object
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            console.error('Error fetching user from database:', err);
            return res.status(500).json({ message: 'Internal server error' }); // Internal error if database query fails
        }
    });
};
