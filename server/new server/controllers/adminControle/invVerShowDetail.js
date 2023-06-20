const client_collection = require('../../models/client');
const bcrypt = require('bcrypt');
const unConfirmedInvestor_collection = require('../../models/unConfirmedInvestor');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { authEmail } = req.body;

  unConfirmedInvestor_collection
    .findOne({ userAuth: authEmail })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      res.json({ Status: 'failed' });
      console.log(e);
    });
};
