const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require("dotenv").config();


module.exports = async (req, res) => {
  
  res.clearCookie("usertoken");
  return res.json({ Status: 'Success' });
};
