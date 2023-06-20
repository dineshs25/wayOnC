const investor_collection = require('../../models/investers');

module.exports = (req, res) => {
  const userAuth = req.params.userAuth;
  const replace = userAuth.replace(/slash/g, '/');

  investor_collection
    .findOne({ userAuth: replace })
    .then((result) => {
      if (result === null) {
        res.send({ Status: 'Failed' });
      } else {
        res.send({ Status: 'Success' });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
