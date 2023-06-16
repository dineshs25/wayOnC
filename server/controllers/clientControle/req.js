const investor_collection = require('../../models/investers');
const nodemailer = require('nodemailer');
const {reqDone} = require('../../emailTemplates/reqDone');
require("dotenv").config();


module.exports = async (req, res) => {
  const { reqested, userAuth } = req.body;

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
    .findOne({ userAuth: userAuth })
    .then((result) => {
      const pen = result.plan.pendingInterest;
      const pendingTotal = result.plan.principal + pen;
      investor_collection
        .findOneAndUpdate(
          { userAuth: userAuth },
          {
            $set: {
              'reqmoney': reqested,
            },
          }
        )
        .then((result) => {
          const name = result.clintInfo.clientName;

          //mail
          let mailOptions = {
            from: 'WayOnC Investments Pvt Ltd.<investors@wayonc.com>', // sender address
            to: 'investors@wayonc.com', // list of receivers
            subject: 'Investor Requested for Interest', // Subject liners

            text: 'Hello world?', // plain text body
            html: `<p>New Request Received</p><br/><table border="1px"><tr><td>Name</td><td>${result.clintInfo.clientName}</td>
            </tr><tr><td>Requested Interest</td><td>${reqested} Rs</td></tr>
            </table>`, // html body
          };

          let mailClientOption = {
            from: 'WayOnC Investments Pvt Ltd.<investors@wayonc.com>', // sender address
            to: result.bankInfo.email, // list of receivers
            subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

            text: 'Hello world?', // plain text body
            // html: `<p>Dear ${result.clintInfo.clientName},</p><br/>
            // <p>Your request is for Interest Rs ${reqested} is sent Successfully</p><br/>
            // <p>Thank you</p>
            // `, 
            html: reqDone(result.clintInfo.clientName, reqested)
            ,
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
            res.send({Status:'Client sent email error occured'});
          }


          res.json({ Status: 'Success', result:result });
        })
        .catch((e) => {
          res.send({Status:'Server side erro req'});
        });
    })
    .catch((e) => {
      res.send({Status:'Failed to send request'});
    });
};
