const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const admin_collection = require('../../models/admin');
require('dotenv').config();


module.exports = async (req, res) => {
  //   const { authEmail } = req.body;
  const token = req.cookies.admintoken;
  if (token) {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.send({ message: 'Authentication Error.' });
      } else {
        admin_collection.findOne({ _id: decoded.admin_id }).then((result) => {
          if (result === null) {
            res.clearCookie(process.env.ADMIN_JWT_NAME);
            return res.send({ message: 'login' });
          } else {
            return res.send({ message: 'Success' });
          }
        });
      }
    });
  } else {
    return res.send({ message: 'we need token please provide it. Login now' });
  }
};
