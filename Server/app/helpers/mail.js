const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'e7f2cb2c732137', // generated ethereal user
    pass: '47065d1397d59d' // generated ethereal password
  }
});

module.exports = transporter;
