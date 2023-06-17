const client_collection = require('../../models/client');
const investor_collection = require('../../models/investers');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { authEmail } = req.body;
  

  investor_collection
    .findOne({ userAuth: authEmail })
    .then((result) => {
      if(result === null){
        res.json({Status: 'Invest'})
      }else{
        res.json({ Status: 'Success', result: result });
      }
    })
    .catch((e) => {
      res.json({ Status: 'failed' });
      console.log(e);
    });
};
