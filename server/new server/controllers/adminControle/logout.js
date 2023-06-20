const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require("dotenv").config();


module.exports = async (req, res) => {
  
  res.clearCookie(process.env.ADMIN_JWT_NAME);
  return res.json({ Status: 'Success' });
};
