// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var refundsSchema = mongoose.Schema({
     
     refund_id  :String,
     userid     : String,
     orderid     : String,
     amount        :String,
     balance_transaction: String,
     chargeId     : String,
     refundcreate :String,
     status     : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Refunds', refundsSchema);
