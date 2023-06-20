const { paidDone } = require('../../emailTemplates/paidDone');
const investor_collection = require('../../models/investers');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  const { time, id } = req.body;
  investor_collection
    .findOne({ _id: id })
    .then((result) => {
      const exestLen = result.plan.arrayMonths.length - 1;
      const lastIdexDate = result.plan.arrayMonths[exestLen];

      const oldArr = result.plan.arrayMonths;

      const months = [];

      let start = new Date(lastIdexDate).toISOString().substring(0, 10);
      let startDate = new Date(start);

      startDate.setMonth(startDate.getMonth() + 1);

      let endDate = new Date(lastIdexDate);
      let exp = endDate.setMonth(endDate.getMonth() + parseInt(time));
      let expDate = new Date(exp).toISOString().substring(0, 10);
      let last = new Date(expDate);

      let end = new Date(last);

      let currentMonth = startDate;

      while (currentMonth <= end) {
        const day = new Date(currentMonth).toISOString().substring(0, 10);
        months.push(day);
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }

      const newArr = oldArr.concat(months);
      const newMonths = parseInt(result.plan.months) + parseInt(time);
      const newExpDate = end;

      investor_collection
        .findOneAndUpdate(
          { _id: id },
          {
            $set: {
              'plan.months': newMonths,
              'plan.arrayMonths': newArr,
              'plan.expdate': newExpDate,
              extend: false,
            },
          }
        )
        .then((result2) => {
          res.send({ Status: 'Success' });
        })
        .catch((e) => {
          res.send({ Status: 'Failed to extend try after some time' });
        });
    })
    .catch((e) => {
      console.log(e);
    });
};
