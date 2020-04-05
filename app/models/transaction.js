// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var transactionSchema = mongoose.Schema({

     userid                     : String,
     orderid                    : String,
     paymentId                  : String,
     amount                     : String,
     balance_transaction        : String,
     created                    : String,
     paid_status                : String,
     sourceId                   : String,
     sourceObject               : String,
     sourceBrand                : String,
     sourceCountry              : String,
     sourceExpMonth             : String,
     sourceExpYears             : String,
     sourceFingerprint          : String,
     sourceFunding              : String,
     sourceLast4                : String,
     sourceName                 : String,
     datetime                   : String,
     refundId                   : String,
     refundstataus              : String

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Transaction', transactionSchema);
