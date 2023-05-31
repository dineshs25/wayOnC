const user_collection = require('../../models/users');
const nodemailer = require('nodemailer');
require('dotenv').config();
const otpGenerator = require('otp-generator');

module.exports = async (req, res) => {
  const { email } = req.body;

  user_collection
    .find({
      userEmail: email,
    })
    .then((result) => {
        user_collection
          .findOneAndUpdate(
            { authEmail: result[0].authEmail },
            {
              $set: {
                otp: 0,
              },
            }
          )
          .then((updateResult) => {
            res.send({ Status: 'Success'});
          })
          .catch((e) => {
            res.send({ Status: 'Failed to send otp ,Please try after soe time' });
          });
    })
    .catch((e) => {
      res.send({ Status: 'Email is Not Registered' });
    });
};
