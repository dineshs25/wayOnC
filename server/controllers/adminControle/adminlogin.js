const admin_collection = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const saltRounds = 10;

module.exports = async (req, res) => {
  const { email, password } = req.body;

  admin_collection
    .findOne({ adminEmail: email })
    .then((result) => {
      bcrypt
        .compare(password, result.password)
        .then((hashPassord) => {
          if (hashPassord === true) {
            const token = jwt.sign(
              { admin_id: result._id },
              process.env.ADMIN_JWT_SECRET,
              {
                expiresIn: '1d',
              }
            );
            res.cookie(process.env.ADMIN_JWT_NAME, token, { httpOnly: true });
            return res.send({ message: 'Success' });
          } else {
            res.send({ Status: 'Password is Incorrect' });
          }
        })
        .catch((e) => {
          res.send({ Status: 'Password is Incorrect' });
        });
    })
    .catch((e) => {
      res.send({ Status: 'Admin not found' });
    });
};
