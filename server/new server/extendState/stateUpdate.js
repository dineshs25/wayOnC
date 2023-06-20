const investor_collection = require('../models/investers');

const StateUpdate = (doc) => {

  investor_collection
    .findOne({ _id: doc._id })
    .then((result) => {
      if (result.extend === false) {
        console.log('false');
      } else {
        investor_collection
          .findOneAndUpdate(
            { _id: doc._id },
            {
              $set: {
                extend: true,
              },
            }
          )
          .then((result) => {})
          .catch((e) => {});
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { StateUpdate };
