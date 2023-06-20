const admin_collection = require('../../models/admin');

module.exports = async(req, res) => {
  await admin_collection
    .find()
    .then((result) => {
      res.json({ Status: "Success", result: result });
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
