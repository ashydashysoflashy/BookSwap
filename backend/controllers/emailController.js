//Use nodemailer to control the emailing functionality
const nodemailer = require('nodemailer');
const { getUserEmailById } = require('./userController'); // Import the function

//Send an email
const sendEmail = async (req, res) => {

  // Extract email details from request body
  const { senderEmail, receiverID, subject, message } = req.body;

  // Get the receipient (seller) email by their user id
  const recipientEmail = await getUserEmailById(receiverID);

  // Check if the sender's email is the same as the recipient's
  if (senderEmail === recipientEmail) {
    return res.status(400).json({ error: "Cannot send email to yourself." });
  }

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // application's email
    to: recipientEmail,
    replyTo: senderEmail, // Sender's email
    subject: subject,
    text: message,
  };


  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(400).json({ error: 'Error sending email', details: error });
  }
};

module.exports = { sendEmail };
