const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');

module.exports = async (req, res) => {
  await investor_collection
    .find()
    .then((result) => {
      const today = new Date('2023-06-23').toISOString().substring(0, 10);
      const arrayDoc = [];
      result.map((doc) => {
        const todayArray = doc.plan.arrayMonths;
        todayArray.map((value) => {
          if (value === today) {
            return arrayDoc.push(doc);
          }
        });
      });
      res.json({ Status: 'Success', result: arrayDoc });
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
