const user_collection = require('../../models/users');

module.exports = async (req, res) => {
  const { authEmail } = req.body;
  user_collection
    .findOne({ authEmail: authEmail })
    .then((result) => {
      if (result === null) {
        res.send({ Status: 'User Not found' });
      } else {
        res.send({ Status: 'Success', result: result });
      }
    })
    .catch((e) => {
      console.log('Server side error profile', e);
    });
};
