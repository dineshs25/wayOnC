const investor_collection = require('../../models/investers');
const nodemailer = require('nodemailer');
const { reqDone } = require('../../emailTemplates/reqDone');
const { checkOutReq } = require('../../emailTemplates/checkOutReq');
require('dotenv').config();

module.exports = async (req, res) => {
  const { id } = req.body;

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
    .findOne({ _id: id })
    .then((result) => {
      if (!result.checkout) {
        const totalInvestment = result.plan.principal;
        const returningPrincipal =
          parseInt(totalInvestment) - (parseInt(totalInvestment) * 15) / 100;
        const returningAmount =
          returningPrincipal - parseInt(result.plan.paidInterest);

        investor_collection
          .findOneAndUpdate(
            { _id: id },
            {
              $set: {
                checkout: true,
                checkoutMoney: returningAmount,
              },
            }
          )
          .then((result2) => {
            //mail
            let mailOptions = {
              from: 'Finance Company Pvt ltd<investors@wayonc.com>', // sender address
              to: 'investors@wayonc.com', // list of receivers
              subject: 'New Checkout Request', // Subject liners

              text: 'Hello world?', // plain text body
              html: `<table border="1px"><tr><td>Name</td><td>${result.clintInfo.clientName}</td>
            </tr><tr><td>Email</td><td>${result.bankInfo.email}</td></tr>
            <tr><td>CheckOut</td><td>${returningAmount}</td></tr>
            </table>`, // html body
            };

            let mailClientOption = {
              from: 'WayOnC Investments Pvt Ltd.<investors@wayonc.com>', // sender address
              to: result.bankInfo.email, // list of receivers
              subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

              text: 'Hello world?',
              html: checkOutReq(result.clintInfo.clientName, returningAmount),
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
            res.send({
              Status: 'Failed to send Request please try after some time',
            });
          });
      } else if (result.checkout === true) {
        res.send({ Status: 'Checkout Request is already sent' });
      } else {
        const totalInvestment = result.plan.principal;
        const returningPrincipal =
          parseInt(totalInvestment) - (parseInt(totalInvestment) * 15) / 100;
        const returningAmount =
          returningPrincipal - parseInt(result.plan.paidInterest);

        // investor_collection
        //   .findOneAndUpdate(
        //     { _id: id },
        //     {
        //       $set: {
        //         checkout: true,
        //         checkoutMoney: returningAmount,
        //       },
        //     }
        //   )
        //   .then((result2) => {
        //mail
        let mailOptions = {
          from: 'Finance Company Pvt ltd<dineshroyc25@gmail.com>', // sender address
          to: 'dineshroyc25@gmail.com', // list of receivers
          subject: 'New Checkout Request', // Subject liners

          text: 'Hello world?', // plain text body
          html: `<table border="1px"><tr><td>Name</td><td>${result.clintinfo.clientName}</td>
              </tr><tr><td>Email</td><td>${result.bank.email}</td></tr>
              <tr><td>CheckOut</td><td>${returningAmount}</td></tr>
              </table>`, // html body
        };

        let mailClientOption = {
          from: 'WayOnC Investments Pvt Ltd.<dineshroyc25@gmail.com>', // sender address
          to: result.bank.email, // list of receivers
          subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

          text: 'Hello world?',
          html: checkOutReq(result.clintinfo.clientName, returningAmount),
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
        // })
        // .catch((e) => {
        //   res.send({
        //     Status: 'Failed to send Request please try after some time',
        //   });
        // });
      }
    })
    .catch((e) => {
      res.send({
        Status: 'Failed to send Checkout Request please try after some time',
      });
    });
};
