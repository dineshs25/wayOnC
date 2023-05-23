const admin_collection = require('../../models/admin');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = async (req, res) => {
  const {
    adminName,
    adminEmail,
    adminExistingPassword,
    adminNewPassword,
    adminExistingEmail,
  } = req.body;
  admin_collection
    .find({ adminEmail: adminExistingEmail })
    .then((result) => {
      if (result[0].length === 0) {
        res.send({ Status: 'No Existing Email found to change Credentials' });
      } else {
        bcrypt
          .compare(adminExistingPassword, result[0].password)
          .then((hashExistPassword) => {
            if (hashExistPassword === true) {
              bcrypt
                .hash(adminNewPassword, saltRounds)
                .then((hashPassword) => {
                  admin_collection
                    .findOneAndUpdate(
                      { password: adminExistingPassword },
                      {
                        $set: {
                          adminName: adminName,
                          adminEmail: adminEmail,
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
            } else {
              res.send({ Status: 'Password is Incorrect' });
            }
          });
      }
    })
    .catch((e) => {
      console.log('No record');
    });
};
