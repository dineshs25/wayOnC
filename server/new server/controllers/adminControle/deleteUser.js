const employee_collection = require('../../models/employee');

module.exports = async (req, res) => {
  const { id } = req.params;
  employee_collection
    .deleteOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success' });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to delete' });
    });
};
