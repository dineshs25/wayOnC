const client_collection = require('../../models/client');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

module.exports = async (req, res) => {
  const { id } = req.params;
  client_collection
    .deleteOne({ _id: id })
    .then((result) => {
      // const path = result.image.passportSizeImage;
      // const arr = path.split('/');
      // const newArr = [];
      // arr.map((val, index) => {
      //   if (index === 0 || index === 1) {
      //     newArr.push(val);
      //   }
      // });
      // const folder = newArr.join('/');
    
      
      // cloudinary.uploader.destroy(`${folder}`, function(result) { console.log(result) });
      res.send({ Status: 'Success' });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to delete' });
    });
};
