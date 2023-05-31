const user_collection = require('../../models/users');
const nodemailer = require('nodemailer');
require('dotenv').config();
const otpGenerator = require('otp-generator');

module.exports = async (req, res) => {
  const { authEmail, otp } = req.body;

  user_collection
    .find({
      authEmail: authEmail,
    })
    .then((result) => {
      if (result[0].otp === otp) {
        res.send({ Status: 'Success' });
      } else {
        res.send({ Status: 'Please Enter correct otp' });
      }
    })
    .catch((e) => {
      res.send({ Status: 'Email is Not Registered' });
    });
};
