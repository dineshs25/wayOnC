const mongoose = require('mongoose');

const admin_Schema = new mongoose.Schema({
  adminName: {
    type: String,
  },
  adminEmail: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const admin_collection = mongoose.model('Admincred', admin_Schema);

module.exports = admin_collection;
