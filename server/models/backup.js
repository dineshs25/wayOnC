const mongoose = require('mongoose');

const backup_Schema = new mongoose.Schema({
  userAuth: {
    type: String,
  },
  clintInfo: {
    clientName: {
      type: String,
    },
    dob: {
      type: Date,
    },
    pan: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    passport: {
      type: String,
    },
  },
  bankInfo: {
    mobile: {
      type: String,
    },
    altMobile: {
      type: String,
    },
    bankAC: {
      type: String,
    },
    accHolder: {
      type: String,
    },
    ifsc: {
      type: String,
    },
    bankName: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
  },
  nominee: {
    nomineeName: {
      type: String,
    },
    nomineeMobile: {
      type: String,
    },
    nomineeRelationship: {
      type: String,
    },
    nomineeAadhar: {
      type: String,
    },
    nomineeEmail: {
      type: String,
    },
    nomineeAddress: {
      type: String,
    },
  },
  image: {
    passportSizeImage: {
      type: String,
    },
    aadharImage: {
      type: String,
    },
    panImage: {
      type: String,
    },
    signatureImage: {
      type: String,
    },
  },
  plan: {
    months: {
      type: String,
    },
    arrayMonths: {
      type: Array,
    },
    startdate: {
      type: Date,
    },
    expdate: {
      type: Date,
    },
    principal: {
      type: String,
    },
    interestPerMonth: {
      type: String,
    },
    totalInterest: {
      type: String,
    },
    totalReturnAmount: {
      type: String,
    },
    ageOfInterest: {
      type: String,
    },
    earnedInterest: {
      type: String,
    },
    paidInterest: {
      type: String,
    },
    pendingInterest: {
      type: String,
    },
    pendingTotalAmount: {
      type: String,
    },
  },
  reqmoney: {
    type: String,
  },
  extend: {
    type: Boolean,
  },
  checkout: {
    type: Boolean,
  },
  checkoutMoney: {
    type: String,
  },
});

const backup_collection = mongoose.model('Backup', backup_Schema);

module.exports = backup_collection;
