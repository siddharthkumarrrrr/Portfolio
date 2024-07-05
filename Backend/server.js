const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// POST route to handle form submission
app.post('/send', (req, res) => {
  const { name, email, subject, number, comments } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New message from ${name}: ${subject}`,
    text: `You have received a new message from your website contact form.\n\n` +
          `Here are the details:\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Contact Number: ${number}\n` +
          `Message:\n${comments}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
