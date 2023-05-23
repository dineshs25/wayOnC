const client_collection = require('../../models/client');

module.exports = (req, res) => {
  return client_collection
    .find({})
    .then((result) => {
      res.json({Status:"Success",result:result});
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
