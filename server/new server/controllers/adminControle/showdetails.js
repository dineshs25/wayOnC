const client_collection = require('../../models/client');
const bcrypt = require('bcrypt');
const investor_collection = require('../../models/investers');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { authEmail } = req.body;

  investor_collection
    .findOne({ userAuth: authEmail })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      res.json({ Status: 'failed' });
      console.log(e);
    });
};
