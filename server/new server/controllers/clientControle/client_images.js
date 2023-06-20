const client_collection = require('../../models/client');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'duusv7nak',
  api_key: '433967572837534',
  api_secret: 'LiTmpJmJCIdTVNYBvJWlVj-32xw',
});

module.exports = async (req, res) => {
  const { aadharImage, passportSizeImage, signatureImage, panImage ,id } = req.body;
  const dinesh = 'Dinesh';
  const array = [aadharImage, passportSizeImage, signatureImage, panImage];


  let image = async (value) => {
    try {
      const response = await cloudinary.uploader.upload(value, {
        upload_preset: 'fintech',
        folder: `fintech/${dinesh}`,
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
    .then((result) => {
      try {
          client_collection.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                plan: {
                  aadharImage: result[0].public_id,
                  passportSizeImage: result[1].public_id,
                  signatureImage: result[2].public_id,
                  panImage: result[3].public_id,
                },
              },
            }
          )
          .then((res) => {
            console.log("Updated Successfully");
          })
          .catch((e) => {
            console.log('npot updated', e);
          });
      } catch (e) {
        console.log('update error server', e);
      }
      // });
    })
    .catch((e) => {
      console.log('promise error uploading images', e);
    });
};
