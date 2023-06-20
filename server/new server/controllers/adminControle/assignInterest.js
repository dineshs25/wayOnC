const { paidDone } = require('../../emailTemplates/paidDone');
const unConfirmedInvestor_collection = require('../../models/unConfirmedInvestor');
const backup_collection = require('../../models/backup');
const user_collection = require('../../models/users');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  const { interest, id } = req.body;

  // const annumInt = parseInt(interest) * 12;

  unConfirmedInvestor_collection
    .findOne({ _id: id })
    .then((result) => {
      if (result === null) {
        res.send({ Status: 'No Investor found' });
      } else {
        if (result.interest) {
          res.send({ Status: 'Interest already assigned' });
        } else {
          const principal = parseInt(result.plan.principal);
          const totalMonths = parseInt(result.plan.months);
          const int = parseFloat(interest);

          const totalInterest = (principal * int * totalMonths) / 100;
          const perMonthInterest = totalInterest / totalMonths;
          const totalAmountReturns = principal + totalInterest;

          const tds = (parseInt(perMonthInterest) * 10) / 100;

          unConfirmedInvestor_collection
            .findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  interest: interest,
                  tds: tds,
                  'plan.totalInterest': totalInterest,
                  'plan.totalReturnAmount': totalAmountReturns,
                  'plan.interestPerMonth': perMonthInterest,
                },
              }
            )
            .then((result2) => {
              res.send({ Status: 'Success' });
            })
            .catch((e) => {
              res.send({ Status: 'Failed to assign interest' });
            });
        }
      }
    })
    .catch((e) => {
      res.send({ Status: 'Failed to assign interest' });
    });
};
