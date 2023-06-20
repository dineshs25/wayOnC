const unConfirmedInvestor_collection = require('../../models/unConfirmedInvestor');

module.exports = async (req, res) => {
  const { id } = req.params;
  unConfirmedInvestor_collection
    .deleteOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success' });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to delete' });
    });
};
