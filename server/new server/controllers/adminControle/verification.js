const client_collection = require('../../models/client');

module.exports = async (req, res) => {
  const { id } = req.body;
  client_collection
    .findOneAndUpdate(
      { _id: id },
      {
        $set: {
          verification: true,
        },
      }
    )
    .then((result) => {
      res.send({Status: "Success"})
    })
    .catch((e) => {
        res.send({Status: "Failed"})
    });
};
