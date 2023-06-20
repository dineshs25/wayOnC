const employee_collection = require('../../models/employee');

module.exports = (req, res) => {
  return employee_collection
    .find()
    .then((result) => {
      res.json({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Server error in find all client_get', e);
    });
};
