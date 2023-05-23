const investor_collection = require('../../models/investers');
const nodemailer = require('nodemailer');
require("dotenv").config();

module.exports = async (req, res) => {
  const { reqMoney, authEmail } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.qrbdqwgxmiphtnuz,
    },
  });

  investor_collection
    .findOne({ userAuth: authEmail })
    .then((result) => {
      // const totalpaid =
      //   parseInt(result.plan.paidInterest) + parseInt(payedInterest);
      const totalpaid = parseInt(result.plan.paidInterest) + parseInt(reqMoney);

      if (result.plan.earnedInterest === result.plan.paidInterest) {
        const pending1 = 0;
        const totalPending =
          parseInt(result.plan.principal) + parseInt(pending1);

        investor_collection
          .findOneAndUpdate(
            { userAuth: authEmail },
            {
              $set: {
                'plan.paidInterest': totalpaid,
                'plan.pendingInterest': pending1,
                'plan.pendingTotalAmount': totalPending,
                reqmoney: 0,
              },
            }
          )
          .then((result) => {
            console.log(result);
            //mail
            let mailOptions = {
              from: 'Finance Company Pvt ltd<dineshroyc25@gmail.com>', // sender address
              to: 'dineshroyc25@gmail.com', // list of receivers
              subject: 'Investor Requested Interest Paid', // Subject liners

              text: 'Hello world?', // plain text body
              html: `<p>Requested Interest Paid</p><br/><table border="1px"><tr><td>Name</td><td>${result.clintInfo.clientName}</td>
            </tr><tr><td>Paid Interest</td><td>${reqMoney} Rs</td></tr><tr><td>Total Interest Paid</td><td>${totalpaid} Rs</td></tr>
            </table>`, // html body
            };

            let mailClientOption = {
              from: 'Finance Company Pvt ltd<dineshroyc25@gmail.com>', // sender address
              to: result.bankInfo.email, // list of receivers
              subject: 'Paid Your Requested Interest', // Subject liners

              text: 'Hello world?', // plain text body
              html: `<p>Dear ${result.clintInfo.clientName},</p><br/>
            <p>Your requested Interest Rs ${reqMoney} has been paid Successfully</p><br/>
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

            res.send({ Status: 'Success' });
          })
          .catch((e) => {
            console.log('server side error in reqmoney js', e);
          });
      } else {
        investor_collection
          .findOneAndUpdate(
            { userAuth: authEmail },
            {
              $set: {
                'plan.paidInterest': totalpaid,
                reqmoney: 0,
              },
            }
          )
          .then((result) => {
            investor_collection
              .findOne({ _id: result._id })
              .then((result) => {
                const pending =
                  parseInt(result.plan.earnedInterest) -
                  parseInt(result.plan.paidInterest);
                const totalPending =
                  parseInt(result.plan.principal) + parseInt(pending);
                // const totalPending = parseInt(result.plan.principal) + 0;
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
                    res.send({ Status: 'Success' });
                  })
                  .catch((e) => {
                    console.log('Server side error paid amount', e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log('server side error in reqmoney js', e);
          });
      }
    })
    .catch((e) => {
      console.log('server side erro padiamt', e);
    });
};
