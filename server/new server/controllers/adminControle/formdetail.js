const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');

module.exports = async (req, res) => {
  const id = req.params.id;
  client_collection
    .findOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      res.send({Status: 'Failed'});
    });
};
