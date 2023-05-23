const investor_collection = require('../models/investers');

const MonthChecker = (doc, index, ded) => {
  const count = index+1;
  const earnedInterest = count * parseInt(doc.plan.interestPerMonth);
  const dedInterest = earnedInterest - ded
  const pendingInterest =
    parseInt(dedInterest) - parseInt(doc.plan.paidInterest);
  const totalPending = parseInt(doc.plan.principal) + parseInt(pendingInterest);
  investor_collection
    .findOneAndUpdate(
      { _id: doc._id },
      {
        $set: {
          'plan.arrayMonths': doc.plan.arrayMonths,
          'plan.month': doc.plan.months,
          'plan.startdate': doc.plan.startdate,
          'plan.expdate': doc.plan.expdate,
          'plan.principal': doc.plan.principal,
          'plan.interestPerMonth': doc.plan.interestPerMonth,
          'plan.totalInterest': doc.plan.totalInterest,
          'plan.totalReturnAmount': doc.plan.totalReturnAmount,
          'plan.ageOfInterest': count,
          'plan.earnedInterest': dedInterest,
          'plan.paidInterest': doc.plan.paidInterest,
          'plan.pendingInterest': pendingInterest,
          'plan.pendingTotalAmount': totalPending,
          reqmoney: doc.reqmoney,
        },
      }
    )
    .then((result) => {})
    .catch((e) => {});
};

module.exports = { MonthChecker };
