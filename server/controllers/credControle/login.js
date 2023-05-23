const user_collection = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require("dotenv").config();


const saltRounds = 10;

module.exports = async (req, res) => {
  const { email, password } = req.body;

  user_collection.findOne({ userEmail: email }).then((result) => {
    if (result) {
      bcrypt.compare(email, result.authEmail).then((hashEmail) => {
        if (hashEmail === true) {
          bcrypt
            .compare(password, result.password)
            .then((hashPassword) => {
              if (hashPassword === true) {
                const email = result.email;
                const token = jwt.sign(
                  { user_id: result._id, email },
                  process.env.CLIENT_JWT_SECRET,
                  {
                    expiresIn: '1d',
                  }
                );
                res.cookie(process.env.CLIENT_JWT_NAME, token, { httpOnly: true });

                return res.json({
                  Status: 'Success',
                  result: result.authEmail,
                });
              } else {
                return res.send({ message: 'Please enter correct password' });
              }
            })
            .catch((e) => {
              res.send({ message: 'Please enter correct password' });
              console.log('server login error', e);
            });
        } else {
          return res.send({ message: 'Please enter correct email' });
        }
      });
    } else {
      res.send({ message: 'Please fill the form Or wait till get the login credentials' });
    }
  });

  // .catch((e) => {
  //   console.log('server login bcrypt catch error', e);
  // });
};
