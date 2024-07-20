const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/google', googleAuth);

module.exports = router;