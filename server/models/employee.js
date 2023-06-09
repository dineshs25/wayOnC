const mongoose = require('mongoose');

const employee_Schema = new mongoose.Schema({
  UserName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  view: {
    type: String,
  },
});

const employee_collection = mongoose.model('EmployeeCred', employee_Schema);

module.exports = employee_collection;
