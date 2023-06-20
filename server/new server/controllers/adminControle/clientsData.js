const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');

module.exports = async (req, res) => {
  await investor_collection
    .find({})
    .then((result) => {
      res.json({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
