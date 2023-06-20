const client_collection = require('../../models/client');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const investor_collection = require('../../models/investers');
const user_collection = require('../../models/users');
// const transporter = require('../../email.config');
const nodemailer = require('nodemailer');
const _ = require('lodash');
require('dotenv').config();
const { formSubmit } = require('../../emailTemplates/formSubmit');

const saltRounds = 10;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.GMAIL_AUTH_USER,
  //     pass: process.env.GMAIL_AUTH_PASSWORD,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    // host: 'smtp.privateemail.com',
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.GMAIL_AUTH_PASSWORD,
    },
  });

  const {
    clientName,
    dob,
    panNum,
    adhaar,
    passportNum,
    mobile,
    altMobile,
    bank_AC_Num,
    acc_holder_name,
    ifsc_Code,
    bankName,
    email,
    address,
    permanentAddress,
    // months,
  } = req.body.formData;

  const {
    nominee_name,
    nominee_mobile,
    nominee_relationship,
    nominee_adhaar,
    nominee_email,
    nominee_address,
  } = req.body.nomineeData;

  const { aadharImage, passportSizeImage, signatureImage, panImage } = req.body;

  const CapsName = _.capitalize(clientName);

  const foldername = Date.now() + '-' + CapsName;
  const array = [aadharImage, passportSizeImage, signatureImage, panImage];

  try {
    let image = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'wayonc',
          folder: `wayonc/${foldername}`,
          allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'ico', 'jfif'],
        });
        return response;
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    const upload = array.map(image);

    Promise.all(upload)
      .then((result1) => {
        // console.log(result1);
        try {
          user_collection
            .findOne({ userEmail: email })
            .then((result) => {
              if (result === null) {
                const newClient = new client_collection({
                  clintInfo: {
                    clientName: CapsName,
                    dob: dob,
                    pan: panNum,
                    aadhar: adhaar,
                    passport: passportNum,
                  },
                  bankInfo: {
                    mobile: mobile,
                    altMobile: altMobile,
                    bankAC: bank_AC_Num,
                    accHolder: acc_holder_name,
                    ifsc: ifsc_Code,
                    bankName: bankName,
                    email: email,
                    address: address,
                    permanentAddress: permanentAddress,
                  },
                  nominee: {
                    nomineeName: nominee_name,
                    nomineeMobile: nominee_mobile,
                    nomineeRelationship: nominee_relationship,
                    nomineeAadhar: nominee_adhaar,
                    nomineeEmail: nominee_email,
                    nomineeAddress: nominee_address,
                  },
                  image: {
                    aadharImage: result1[0].public_id,
                    passportSizeImage: result1[1].public_id,
                    signatureImage: result1[2].public_id,
                    panImage: result1[3].public_id,
                  },
                  verification: false,
                });
                client_collection
                  .insertMany(newClient)
                  .then((result) => {
                    //mail
                    let mailOptions = {
                      from: 'WayOnC Investments Pvt Ltd.<investors@wayonc.com>', // sender address
                      to: 'investors@wayonc.com', // list of receivers
                      subject: 'New Form Submitted', // Subject liners

                      text: 'Hello world?', // plain text body
                      html: `<table border="1px"><tr><td>Name</td><td>${clientName}</td>
                      </tr>
                      <tr><td>Email</td><td>${email}</td></tr>
                      </table>`, // html body
                    };

                    let mailClientOption = {
                      from: 'WayOnC Investments Pvt Ltd.<investors@wayonc.com>', // sender address
                      to: email, // list of receivers
                      subject: 'WayOnC Investments Pvt Ltd.', // Subject liners

                      text: 'Hello world?', // plain text body

                      html: formSubmit(clientName),
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

                    res.json({
                      Status: 'Inserted data successfully',
                      result: result,
                    });
                  })
                  .catch((e) => {
                    console.log('Insertion failed', e);
                  });
              } else {
                res.send({ Status: 'Please provide different Email' });
              }
            })
            .catch((e) => {
              console.log('promise error server', e);
            });
        } catch (e) {
          console.log(e);
        }

        // });
      })
      .catch((e) => {
        console.log('promise error uploading images', e);
      });
  } catch (e) {
    console.log('server bycrpt catch error in client_post', e);
  }
};
