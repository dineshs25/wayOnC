const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dineshroyc25@gmail.com',
    pass: 'qrbdqwgxmiphtnuz',
  },
});

exports.transporter = transporter;
