const admin_collection = require('../../models/admin');
const user_collection = require('../../models/users');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { newPassword, email } = req.body;
  user_collection
    .find({ userEmail: email })
    .then((result) => {
      if (result[0].length === 0) {
        res.send({ Status: 'No Existing Email found to change Credentials' });
      } else {
        bcrypt
          .hash(newPassword, saltRounds)
          .then((hashPassword) => {
            user_collection
              .findOneAndUpdate(
                { userEmail: email },
                {
                  $set: {
                    password: hashPassword,
                  },
                }
              )
              .then((result) => {
                res.send({ Status: 'Success' });
              })
              .catch((e) => {
                res.send({ Status: 'Failed to change Credentials' });
              });
          })
          .catch((e) => {
            res.send({ Status: 'Failed to Change Password' });
          });
      }
    })
    .catch((e) => {
      res.send({ Status: 'No User found in this email' });
    });
};
