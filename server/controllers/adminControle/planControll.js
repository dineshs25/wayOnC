const plan_collection = require('../../models/plan');

module.exports = (req, res) => {
  return plan_collection
    .find()
    .then((result) => {
      res.json({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
