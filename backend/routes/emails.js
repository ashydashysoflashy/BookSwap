const express = require('express');
const router = express.Router();

// send email function
const { sendEmail } = require('../controllers/emailController');

// Route to send an email
router.post('/send', sendEmail);

module.exports = router;
