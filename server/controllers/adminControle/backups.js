const backup_collection = require('../../models/backup');

module.exports = async (req, res) => {
  await backup_collection
    .find()
    .then((result) => {
      res.json({ Status: 'Success', result: result });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to fetch' });
    });
};
