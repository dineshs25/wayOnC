const client_collection = require('../../models/client');
const bcrypt = require('bcrypt');
const investor_collection = require('../../models/investers');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { authEmail } = req.body;

  investor_collection
    .findOne({ userAuth: authEmail })
    .then((result) => {
      const pending =
        parseInt(result.plan.earnedInterest) -
        parseInt(result.plan.paidInterest);
      const totalPending = parseInt(result.plan.principal) + parseInt(pending);
      investor_collection
        .findOneAndUpdate(
          { userAuth: authEmail },
          {
            $set: {
              'plan.pendingInterest': pending,
              'plan.pendingTotalAmount': totalPending,
            },
          }
        )
        .then((result) => {
          res.json({ Status: 'Success', result: result });
        })
        .catch((e) => {});
    })
    .catch((e) => {
      res.json({ Status: 'failed' });
      console.log(e);
    });
};
