const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '59d2ed1fc853ff', // generated ethereal user
    pass: '0b944d50fb550a' // generated ethereal password
  }
});

module.exports = transporter;
