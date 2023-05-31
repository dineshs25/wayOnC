const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');

module.exports = async (req, res) => {
  await investor_collection
    .find()
    .then((result) => {
      const arrayDoc = [];
      result.map((doc) => {
        const todayArray = doc.reqmoney;
        if (todayArray > 0) {
          return arrayDoc.push(doc);
        }
      });
      res.json({ Status: 'Success', result: arrayDoc });
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
