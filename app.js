const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
require('dotenv').config(); 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files

// Environment variables (use dotenv in production)
const isVercel = process.env.VERCEL_ENV === 'production';
const PORT = process.env.PORT || 3000;
//const EMAIL_USER = process.env.EMAIL_USER ;
// const EMAIL_PASS = process.env.EMAIL_PASS ;

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    }
  });



  // Serve HTML file (adjust as needed)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
 // res.sendFile(path.join(__dirname,  'index.html'));
});

// Vercel compatibility
if (isVercel) {
 module.exports = app;
} else {
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
}
