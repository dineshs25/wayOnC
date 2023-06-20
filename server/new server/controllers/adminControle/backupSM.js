const client_collection = require('../../models/client');
const bcrypt = require('bcrypt');
const backup_collection = require('../../models/backup');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { userID } = req.body;

  backup_collection
    .findOne({ _id: userID })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      res.json({ Status: 'failed' });
      console.log(e);
    });
};
