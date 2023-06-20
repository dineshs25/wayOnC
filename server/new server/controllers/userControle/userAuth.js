const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const employee_collection = require('../../models/employee');
require('dotenv').config();

module.exports = async (req, res) => {
  const { cookie } = req.body;
  const token = req.cookies.usertoken;
  if (cookie) {
    jwt.verify(cookie, process.env.USER_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.send({ message: 'Authentication Error.' });
      } else {
        employee_collection
          .findOne({ _id: decoded.admin_id })
          .then((result) => {
            if (result === null) {
              res.clearCookie('usertoken');
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
