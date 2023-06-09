const client_collection = require('../../models/client');

module.exports = async (req, res) => {
  const { id } = req.params;
  client_collection
    .deleteOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success' });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to delete' });
    });
};
