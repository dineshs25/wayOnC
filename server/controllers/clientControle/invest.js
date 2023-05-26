const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  const userAuth = req.params.slug;
  let hash = userAuth.replace(/slash/g, '/');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.GMAIL_AUTH_PASSWORD,
    },
  });

  const { amt, time } = req.body;
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

  investor_collection
    .findOne({ userAuth: hash })
    .then((result) => {
      if (result === null) {
        client_collection
          .findOne({ userAuth: hash })
          .then((result) => {
            const newInvestor = new investor_collection({
              userAuth: result.userAuth,
              clintInfo: {
                clientName: result.clintInfo.clientName,
                dob: result.clintInfo.dob,
                pan: result.clintInfo.pan,
                aadhar: result.clintInfo.aadhar,
                passport: result.clintInfo.passport,
              },
              bankInfo: {
                mobile: result.bankInfo.mobile,
                altMobile: result.bankInfo.altMobile,
                bankAC: result.bankInfo.bankAC,
                accHolder: result.bankInfo.accHolder,
                ifsc: result.bankInfo.ifsc,
                bankName: result.bankInfo.bankName,
                email: result.bankInfo.email,
                address: result.bankInfo.address,
                permanentAddress: result.bankInfo.permanentAddress,
              },
              nominee: {
                nomineeName: result.nominee.nomineeName,
                nomineeMobile: result.nominee.nomineeMobile,
                nomineeRelationship: result.nominee.nomineeRelationship,
                nomineeAadhar: result.nominee.nomineeAadhar,
                nomineeEmail: result.nominee.nomineeEmail,
                nomineeAddress: result.nominee.nomineeAddress,
              },
              image: {
                aadharImage: result.image.aadharImage,
                passportSizeImage: result.image.passportSizeImage,
                signatureImage: result.image.signatureImage,
                panImage: result.image.panImage,
              },
              plan: {
                months: totalMonths,
                arrayMonths: months,
                startdate: planStartDate,
                expdate: end,
                principal: principal,
                interestPerMonth: perMonthInterest,
                totalInterest: totalInterest,
                totalReturnAmount: totalAmountReturns,
                ageOfInterest: 0,
                earnedInterest: 0,
                paidInterest: 0,
                pendingInterest: 0,
                pendingTotalAmount: principal,
              },
              reqmoney: 0,
            });
            investor_collection
              .insertMany(newInvestor)
              .then((result) => {
                //mail
                let mailOptions = {
                  from: 'Finance Company Pvt ltd<dineshroyc25@gmail.com>', // sender address
                  to: 'dineshroyc25@gmail.com', // list of receivers
                  subject: 'New Investment Received', // Subject liners

                  text: 'Hello world?', // plain text body
                  html: `<p>New Investment Received</p><br/><table border="1px"><tr><td>Name</td><td>${result[0].clintInfo.clientName}</td>
          </tr><tr><td>Invested Amount</td><td>${result[0].plan.principal} Rs</td></tr>
          </table>`, // html body
                };

                let mailClientOption = {
                  from: 'Finance Company Pvt ltd<dineshroyc25@gmail.com>', // sender address
                  to: result[0].bankInfo.email, // list of receivers
                  subject: 'Finance Company Pvt ltd', // Subject liners

                  text: 'Hello world?', // plain text body
                  html: `<p>Dear ${result[0].clintInfo.clientName},</p><br/>
          <p>Thank you for investing</p><br/>
          <p>You can veiw your investment details in your dashbord</p><br/>
          <p>Thank you</p>
          `, // html body
                };

                transporter.sendMail(mailOptions, (err, info) => {
                  if (!err) {
                  } else {
                    console.log(err);
                  }
                });

                try {
                  transporter.sendMail(mailClientOption, (err, info) => {
                    if (!err) {
                    } else {
                      console.log(err);
                    }
                  });
                } catch (e) {
                  console.log('Client sent email error occured');
                }

                res.send({
                  Status: 'Success',
                });
              })
              .catch((e) => {
                res.send({
                  Status: 'failed',
                });
              });
          })
          .catch((e) => {
            console.log('server side error in invest js', e);
          });
      } else {
        res.send({ Status: 'You have already invested' });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
