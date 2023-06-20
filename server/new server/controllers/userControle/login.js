const employee_collection = require('../../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const saltRounds = 10;

module.exports = async (req, res) => {
  const { email, password } = req.body;

  employee_collection
    .findOne({ UserName: email })
    .then((result) => {
      if (result === null) {
        res.send({ Status: 'User not found' });
      } else {
        bcrypt.compare(password, result.password).then((hashPassword) => {
          if (hashPassword === true) {
            const token = jwt.sign(
              { admin_id: result._id },
              "our-wayone-user-jsonwebtoken-secret-key",
              {
                expiresIn: '1d',
              }
            );
            res.cookie("usertoken", token, { httpOnly: true });
            res.send({ Status: 'Success', cookie:token });
          } else {
            res.send({ Status: 'Password is Incorrect' });
          }
        });
      }
    })
    .catch((e) => {
      res.send({ Status: 'Failed to login' });
    });
};
