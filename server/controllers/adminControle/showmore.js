const client_collection = require('../../models/client');
const bcrypt = require('bcrypt');
const investor_collection = require('../../models/investers');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { id } = req.body;

  investor_collection
    .findOne({ _id: id })
    .then((result) => {
    //   console.log(result.userAuth);
      return res.json({ Status: 'Success', result: result.userAuth });
    })
    .catch((e) => {
      res.json({ Status: 'failed' });
      console.log(e);
    });
};
