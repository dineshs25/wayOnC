const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user_collection = require('../../models/users');
require("dotenv").config();


module.exports = async (req, res) => {
  const { authEmail } = req.body;
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.CLIENT_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.send({ message: 'Authentication Error.' });
      } else {
        user_collection.findOne({ _id: decoded.user_id }).then((result) => {
          if (result.authEmail === authEmail) {
            return res.send({ message: 'Success' });
          } else {
            res.clearCookie('token');
            return res.send({ message: 'login' });
          }
        });
      }
    });
  } else {
    return res.send({ message: 'we need token please provide it. Login now' });
  }
};
