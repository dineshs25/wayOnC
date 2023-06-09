const employee_collection = require('../../models/employee');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { verificationDone } = require('../../emailTemplates/verificationDone');
require('dotenv').config();

const saltRounds = 10;

module.exports = async (req, res) => {
  const { userName, newPassword } = req.body;

  employee_collection
    .findOne({ UserName: userName })
    .then((result1) => {
      if (result1 === null) {
        bcrypt
          .hash(newPassword, saltRounds)
          .then((hashPassword) => {
            const newUser = new employee_collection({
              UserName: userName,
              password: hashPassword,
              view: newPassword,
            });
            employee_collection
              .insertMany(newUser)
              .then((result2) => {
                res.send({ Status: 'Success' });
              })
              .catch((e) => {
                res.send({ Status: 'Failed to add user' });
              });
          })
          .catch((e) => {
            res.send({ Status: 'Failed to add user' });
          });
      } else {
        res.send({ Status: 'User already exists' });
      }
    })
    .catch((e) => {
      res.send({ Status: 'Failed to add user' });
    });
};
