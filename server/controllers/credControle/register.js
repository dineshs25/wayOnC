const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');
const user_collection = require('../../models/users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require("dotenv").config();


const saltRounds = 10;

module.exports = async (req, res) => {
  const { id, name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.qrbdqwgxmiphtnuz,
    },
  });

  client_collection
    .findOne({ _id: id })
    .then((result1) => {
      if (result1 === null) {
        res.send({ Status: 'User form not Submitted yet' });
      } else {
        if (result1.verification === true) {
          user_collection
            .findOne({ userEmail: email })
            .then((result2) => {
              if (result2 === null) {
                const dob = new Date(result1.clintInfo.dob).getFullYear();
                const name = result1.clintInfo.clientName;
                const password = name + dob;

                bcrypt.hash(password, saltRounds).then((hashPassword) => {
                  bcrypt.hash(email, saltRounds).then((hashEmail) => {
                    const newUser = new user_collection({
                      username: name,
                      authEmail: hashEmail,
                      userEmail: email,
                      password: hashPassword,
                    });
                    user_collection
                      .insertMany(newUser)
                      .then((result3) => {
                        client_collection
                          .findOneAndUpdate(
                            { 'bankInfo.email': result3[0].userEmail },
                            {
                              $set: {
                                userAuth: hashEmail,
                              },
                            }
                          )
                          .then((result) => {
                            if (result === null) {
                              res.send({ Status: 'Form data not found' });
                            } else {
                              let mailClientOption = {
                                from: 'Finance Company Pvt ltd<dineshroyc25@gmail.com>', // sender address
                                to: email, // list of receivers
                                subject: 'Finance Company Pvt ltd', // Subject liners

                                text: 'Hello world?', // plain text body
                                html: `<p>Dear ${name},</p><br/>
                                <p>Your details are successfully verified</p><br/>
                                <p>You can login to your Account with your email and password</p><br/>
                                <p>Your login password : your name with your born year (eg: Name2001)</p><br/>
                                <p>Thank you</p>
                                `, // html body
                              };

                              transporter.sendMail(mailClientOption, (err, info) => {
                                if (!err) {
                                } else {
                                  console.log(err);
                                }
                              });

                              res.send({ Status: 'Success' });
                            }
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      })
                      .catch((e) => {
                        res.send({ Status: 'Registaration Failed' });
                      });
                  });
                });
              } else {
                res.send({ Status: 'User is already Registered' });
              }
            })
            .catch((e) => {
              console.log('User not found');
            });
        } else {
          res.send({
            Status: 'Please verify form data first then Register',
          });
        }
      }
    })
    .catch((e) => {
      res.send({ Status: 'User form not Submitted yet' });
    });
};
