const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        console.error('JWT Verify Error:', error.message);
        res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
};

module.exports = verifyToken;
