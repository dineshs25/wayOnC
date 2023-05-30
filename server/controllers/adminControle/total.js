const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');

module.exports = async (req, res) => {
  client_collection
    .count()
    .then((clientResult) => {
      investor_collection
        .count()
        .then((investorResult) => {
          investor_collection
            .find()
            .then((todayResult) => {
              const today = new Date('2023-06-29')
                .toISOString()
                .substring(0, 10);
              const arrayDoc = [];
              todayResult.map((doc) => {
                const todayArray = doc.plan.arrayMonths;
                todayArray.map((value) => {
                  if (value === today) {
                    return arrayDoc.push(doc);
                  }
                });
              });
              res.send({
                Status: 'Success',
                TodayEarners: arrayDoc.length,
                Client: clientResult,
                Invest: investorResult,
                investorTable: todayResult,
              });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};
