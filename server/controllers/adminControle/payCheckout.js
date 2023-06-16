const { paidDone } = require('../../emailTemplates/paidDone');
const investor_collection = require('../../models/investers');
const backup_collection = require('../../models/backup');
const user_collection = require('../../models/users');
const nodemailer = require('nodemailer');
const { checkOutPaid } = require('../../emailTemplates/checkOutPaid');

require('dotenv').config();

module.exports = async (req, res) => {
  const { authEmail } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.GMAIL_AUTH_PASSWORD,
    },
  });

  investor_collection
    .findOne({ userAuth: authEmail })
    .then((result) => {
      const newBackup = new backup_collection({
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
          months: result.plan.months,
          arrayMonths: result.plan.arrayMonths,
          startdate: result.plan.startdate,
          expdate: result.plan.expdate,
          principal: result.plan.principal,
          interestPerMonth: result.plan.interestPerMonth,
          totalInterest: result.plan.totalInterest,
          totalReturnAmount: result.plan.totalReturnAmount,
          ageOfInterest: result.plan.ageOfInterest,
          earnedInterest: result.plan.earnedInterest,
          paidInterest: result.plan.paidInterest,
          pendingInterest: result.plan.pendingInterest,
          pendingTotalAmount: result.plan.pendingTotalAmount,
        },
        reqmoney: 0,
        extend: result.extend,
        checkout: result.checkout,
        checkoutMoney: result.checkoutMoney,
      });

      backup_collection
        .insertMany(newBackup)
        .then((result2) => {
          investor_collection
            .findOneAndDelete({ userAuth: authEmail })
            .then((result3) => {
              user_collection
                .findOneAndDelete({ authEmail: authEmail })
                .then((result4) => {
                  //mail
                  let mailOptions = {
                    from: 'Finance Company Pvt ltd<investors@wayonc.com>', // sender address
                    to: 'investors@wayonc.com', // list of receivers
                    subject: 'New Checkout Paid', // Subject liners

                    text: 'Hello world?', // plain text body
                    html: `<table border="1px"><tr><td>Name</td><td>${result.clintInfo.clientName}</td>
            </tr><tr><td>Email</td><td>${result.bankInfo.email}</td></tr>
            <tr><td>CheckOut Paid</td><td>${result.checkoutMoney}</td></tr>
            </table>`, // html body
                  };

                  let mailClientOption = {
                    from: 'WayOnC Investments Pvt Ltd.<investors@wayonc.com>', // sender address
                    to: result.bankInfo.email, // list of receivers
                    subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

                    text: 'Hello world?',
                    html: checkOutPaid(
                      result.clintInfo.clientName,
                      result.checkoutMoney
                    ),
                  };

                  transporter.sendMail(mailOptions, (err, info) => {
                    if (!err) {
                    } else {
                      console.log('Client sent email error occured');
                    }
                  });
                  try {
                    transporter.sendMail(mailClientOption, (err, info) => {
                      if (!err) {
                      } else {
                        console.log('Client sent email error occured');
                      }
                    });
                  } catch (e) {
                    console.log('Client sent email error occured');
                  }
                  res.send({ Status: 'Success' });
                })
                .catch((e) => {
                  res.send({ Status: 'Failed to deactivate user account' });
                });
            })
            .catch((e) => {
              res.send({ Status: 'Failed to delete data' });
            });
        })
        .catch((e) => {
          res.send({ Status: 'Failed to Backup data' });
          console.log(e);
        });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to pay Please try again after some time' });
    });
};
