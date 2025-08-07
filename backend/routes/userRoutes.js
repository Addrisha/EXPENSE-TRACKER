const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    me: getMe,
} = require('../controllers/userController');

const verifyToken = require('../middleware/verifyToken'); // ✅ Add this line

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', verifyToken, getMe); // ✅ This line now works

module.exports = router;
