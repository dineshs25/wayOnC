const mongoose = require('mongoose');

const plan_Schema = new mongoose.Schema({
  months: {
    type: String,
  },
  minAmount: {
    type: String,
  },
});

const plan_collection = mongoose.model('User', plan_Schema);

module.exports = plan_collection;