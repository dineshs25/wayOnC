const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');
const nodemailer = require('nodemailer');
const { investmentDone } = require('../../emailTemplates/investmentDone');
require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const { amt, time } = req.body;
  const userAuth = req.params.slug;
  let hash = userAuth.replace(/slash/g, '/');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.GMAIL_AUTH_PASSWORD,
    },
  });

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  

  const options = {
    amount: Number(amt*100),
    currency: 'INR',
    receipt: crypto.randomBytes(10).toString('hex'),
  };

  const planStartDate = new Date();

  //startdate and end calc starts here
  const months = [];

  let start = new Date().toISOString().substring(0, 10);
  let startDate = new Date(start);

  startDate.setMonth(startDate.getMonth() + 1);

  let endDate = new Date();
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

  const principal = parseInt(amt);
  const totalMonths = parseInt(time);

  const totalInterest = (principal * 3 * totalMonths) / 100;
  const perMonthInterest = totalInterest / totalMonths;
  const totalAmountReturns = principal + totalInterest;

  const tds = (parseInt(perMonthInterest) * 10) / 100;

  investor_collection
    .findOne({ userAuth: hash })
    .then((result) => {
      if (result === null) {
        client_collection
          .findOne({ userAuth: hash })
          .then((result) => {
            //payment
            instance.orders.create(options, (error, order) => {
              if (error) {
                res.send({ Status: 'Payment Failed' });
              } else {
                res.send({ Status: 'Success', data: order, key: process.env.RAZORPAY_API_KEY, result:result });
              }
            });
          })
          .catch((e) => {
            res.send({ Status: 'User Not Found' });
          });
      } else {
        res.send({ Status: 'You have already invested' });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
