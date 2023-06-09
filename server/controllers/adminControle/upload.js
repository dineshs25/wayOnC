const investor_collection = require('../../models/investers');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  const { passportSizeImage, id } = req.body;
  investor_collection
    .findOne({ _id: id })
    .then((result) => {
      const path = result.image.passportSizeImage;
      const arr = path.split('/');
      const newArr = [];
      arr.map((val, index) => {
        if (index === 0 || index === 1) {
          newArr.push(val);
        }
      });
      const folder = newArr.join('/');

      const response = cloudinary.uploader
        .upload(passportSizeImage, {
          upload_preset: 'fintech',
          folder: `${folder}`,
          allowed_formats: [
            'png',
            'jpg',
            'jpeg',
            'svg',
            'webp',
            'ico',
            'jfif',
            'pdf',
          ],
        })
        .then((result2) => {
          //   console.log(result2.public_id);
          investor_collection
            .findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  'image.agreement': result2.public_id,
                },
              }
            )
            .then((result3) => {
              res.send({ Status: 'Success' });
            })
            .catch((e) => {
              res.send({ Status: 'Failed to upload agreement' });
            });
        })
        .catch((e) => {
          res.send({ Status: 'Failed to upload agreement' });
        });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to upload agreement' });
    });
};
