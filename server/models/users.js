const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const user_Schema = new mongoose.Schema({
  username: {
    type: String,
  },
  authEmail: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const user_collection = mongoose.model('User', user_Schema);

module.exports = user_collection;
