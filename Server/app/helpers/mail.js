const nodemailer = require('nodemailer');

const options = {
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_SECURE ? true : false,
};

if (process.env.NODEMAILER_AUTH_USER && process.env.NODEMAILER_AUTH_PASS) {
  options.auth = {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  };
}


const transporter = nodemailer.createTransport(options);

module.exports = transporter;
