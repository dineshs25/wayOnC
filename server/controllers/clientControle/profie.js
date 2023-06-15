const user_collection = require('../../models/users');
const client_collection = require('../../models/client');

module.exports = async (req, res) => {
  const { authEmail } = req.body;
  user_collection
    .findOne({ authEmail: authEmail })
    .then((result) => {
      if (result === null) {
        res.send({ Status: 'User Not found' });
      } else {
        client_collection
          .findOne({ userAuth: authEmail })
          .then((imageResult) => {
            // console.log(imageResult);
            res.send({ Status: 'Success', result: result, image: imageResult.image.passportSizeImage, clientID: imageResult.clientID });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    })
    .catch((e) => {
      console.log('Server side error profile', e);
    });
};
