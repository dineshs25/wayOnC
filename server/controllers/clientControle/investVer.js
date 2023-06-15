const client_collection = require('../../models/client');
const unConfirmedInvestor_collection = require('../../models/unConfirmedInvestor');
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
    .then((result0) => {
      if (result0 === null) {
        unConfirmedInvestor_collection
          .findOne({ userAuth: hash })
          .then((result) => {
            if (result === null) {
              client_collection
                .findOne({ userAuth: hash })
                .then((result1) => {
                  const id = result1._id;

                  const newConfirmedInvestor =
                    new unConfirmedInvestor_collection({
                      userAuth: result1.userAuth,
                      clientID: result1.clientID,
                      verified: false,
                      clintInfo: {
                        clientName: result1.clintInfo.clientName,
                        dob: result1.clintInfo.dob,
                        pan: result1.clintInfo.pan,
                        aadhar: result1.clintInfo.aadhar,
                        passport: result1.clintInfo.passport,
                      },
                      bankInfo: {
                        mobile: result1.bankInfo.mobile,
                        altMobile: result1.bankInfo.altMobile,
                        bankAC: result1.bankInfo.bankAC,
                        accHolder: result1.bankInfo.accHolder,
                        ifsc: result1.bankInfo.ifsc,
                        bankName: result1.bankInfo.bankName,
                        email: result1.bankInfo.email,
                        address: result1.bankInfo.address,
                        permanentAddress: result1.bankInfo.permanentAddress,
                      },
                      nominee: {
                        nomineeName: result1.nominee.nomineeName,
                        nomineeMobile: result1.nominee.nomineeMobile,
                        nomineeRelationship:
                          result1.nominee.nomineeRelationship,
                        nomineeAadhar: result1.nominee.nomineeAadhar,
                        nomineeEmail: result1.nominee.nomineeEmail,
                        nomineeAddress: result1.nominee.nomineeAddress,
                      },
                      image: {
                        passportSizeImage: result1.image.passportSizeImage,
                        aadharImage: result1.image.aadharImage,
                        panImage: result1.image.panImage,
                        signatureImage: result1.image.signatureImage,
                      },
                      plan: {
                        months: time,
                        submittedDate: start,
                        principal: amt,
                      },
                    });

                  unConfirmedInvestor_collection
                    .insertMany(newConfirmedInvestor)
                    .then((result3) => {

                       //mail
                let mailOptions = {
                  from: 'WayOnC Investments Pvt Ltd.<dineshroyc25@gmail.com>', // sender address
                  to: 'dineshroyc25@gmail.com', // list of receivers
                  subject: 'New Investment Received', // Subject liners

                  text: 'Hello world?', // plain text body
                  html: `<p>New Investment Request Received</p><br/><table border="1px"><tr><td>Name</td><td>${result1.clintInfo.clientName}</td>
            </tr><tr><td>Invested Amount</td><td>${amt} Rs</td></tr>
            </table>`, // html body
                };

                let mailClientOption = {
                  from: 'WayOnC Investments Pvt Ltd.<dineshroyc25@gmail.com>', // sender address
                  to: result1.bankInfo.email, // list of receivers
                  subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

                  text: 'Hello world?', // plain text body
                  html: investmentDone(result1.clintInfo.clientName),
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



                      res.send({ Status: 'Success' });
                    })
                    .catch((e) => {
                      res.send({
                        Status: 'Failed to invest please try after some time',
                      });
                    });
                })
                .catch((e) => {
                  res.send({
                    Status: 'Failed to invest please try after some time',
                  });
                });
            } else {
              if (result.verified === false) {
                res.send({
                  Status: 'Your Investment Request is under process',
                });
              } else {
                res.send({ Status: 'You have already invested' });
              }
            }
          })
          .catch((e) => {
            res.send({ Status: 'Failed to invest please try after some time' });
          });
      } else {
        res.send({ Status: 'You have already invested' });
      }
    })
    .catch((e) => {
      res.send({ Status: 'Failed to Invest please try after some time' });
    });

  //   investor_collection
  //     .findOne({ userAuth: hash })
  //     .then((result) => {
  //       if (result === null) {
  //         client_collection
  //           .findOne({ userAuth: hash })
  //           .then((result) => {
  //             const newInvestor = new investor_collection({
  //               userAuth: result.userAuth,
  //               clintInfo: {
  //                 clientName: result.clintInfo.clientName,
  //                 dob: result.clintInfo.dob,
  //                 pan: result.clintInfo.pan,
  //                 aadhar: result.clintInfo.aadhar,
  //                 passport: result.clintInfo.passport,
  //               },
  //               bankInfo: {
  //                 mobile: result.bankInfo.mobile,
  //                 altMobile: result.bankInfo.altMobile,
  //                 bankAC: result.bankInfo.bankAC,
  //                 accHolder: result.bankInfo.accHolder,
  //                 ifsc: result.bankInfo.ifsc,
  //                 bankName: result.bankInfo.bankName,
  //                 email: result.bankInfo.email,
  //                 address: result.bankInfo.address,
  //                 permanentAddress: result.bankInfo.permanentAddress,
  //               },
  //               nominee: {
  //                 nomineeName: result.nominee.nomineeName,
  //                 nomineeMobile: result.nominee.nomineeMobile,
  //                 nomineeRelationship: result.nominee.nomineeRelationship,
  //                 nomineeAadhar: result.nominee.nomineeAadhar,
  //                 nomineeEmail: result.nominee.nomineeEmail,
  //                 nomineeAddress: result.nominee.nomineeAddress,
  //               },
  //               image: {
  //                 aadharImage: result.image.aadharImage,
  //                 passportSizeImage: result.image.passportSizeImage,
  //                 signatureImage: result.image.signatureImage,
  //                 panImage: result.image.panImage,
  //               },
  //               plan: {
  //                 months: totalMonths,
  //                 arrayMonths: months,
  //                 startdate: planStartDate,
  //                 expdate: end,
  //                 principal: principal,
  //                 interestPerMonth: 0,
  //                 totalInterest: 0,
  //                 totalReturnAmount: 0,
  //                 ageOfInterest: 0,
  //                 earnedInterest: 0,
  //                 paidInterest: 0,
  //                 pendingInterest: 0,
  //                 pendingTotalAmount: principal,
  //               },
  //               reqmoney: 0,
  //             });

  //               investor_collection
  //                 .insertMany(newInvestor)
  //                 .then((result) => {
  //                   //mail
  //                   let mailOptions = {
  //                     from: 'WayOnC Investments Pvt Ltd.<dineshroyc25@gmail.com>', // sender address
  //                     to: 'dineshroyc25@gmail.com', // list of receivers
  //                     subject: 'New Investment Received', // Subject liners

  //                     text: 'Hello world?', // plain text body
  //                     html: `<p>New Investment Received</p><br/><table border="1px"><tr><td>Name</td><td>${result[0].clintInfo.clientName}</td>
  //             </tr><tr><td>Invested Amount</td><td>${result[0].plan.principal} Rs</td></tr>
  //             </table>`, // html body
  //                   };

  //                   let mailClientOption = {
  //                     from: 'WayOnC Investments Pvt Ltd.<dineshroyc25@gmail.com>', // sender address
  //                     to: result[0].bankInfo.email, // list of receivers
  //                     subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

  //                     text: 'Hello world?', // plain text body
  //                     //         html: `<p>Dear ${result[0].clintInfo.clientName},</p><br/>
  //                     // <p>Thank you for investing</p><br/>
  //                     // <p>You can veiw your investment details in your dashbord</p><br/>
  //                     // <p>Thank you</p>
  //                     // `,
  //                     html: investmentDone(result[0].clintInfo.clientName),
  //                   };

  //                   transporter.sendMail(mailOptions, (err, info) => {
  //                     if (!err) {
  //                     } else {
  //                       console.log(err);
  //                     }
  //                   });

  //                   try {
  //                     transporter.sendMail(mailClientOption, (err, info) => {
  //                       if (!err) {
  //                       } else {
  //                         console.log(err);
  //                       }
  //                     });
  //                   } catch (e) {
  //                     console.log('Client sent email error occured');
  //                   }

  //                   res.send({
  //                     Status: 'Success',
  //                   });
  //                 })
  //                 .catch((e) => {
  //                   res.send({
  //                     Status: 'failed',
  //                   });
  //                 });
  //           })
  //           .catch((e) => {
  //             console.log('server side error in invest js', e);
  //           });
  //       } else {
  //         res.send({ Status: 'You have already invested' });
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
};
