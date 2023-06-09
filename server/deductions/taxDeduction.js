const investor_collection = require('../models/investers');

const TaxDeduction = (doc, index, ded) => {
  const count = index + 1;
  
  
  const tdsDed = (parseInt(doc.plan.interestPerMonth) * 10) / 100;
  const totDed = tdsDed + ded;
  const deduction = doc.plan.interestPerMonth - totDed;

  
  
  const earnedInterest = count * deduction;
  const pendingInterest =
    parseInt(earnedInterest) - parseInt(doc.plan.paidInterest);
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
          'plan.earnedInterest': earnedInterest,
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

module.exports = { TaxDeduction };
