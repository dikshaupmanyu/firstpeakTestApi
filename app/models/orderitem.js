// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var orderitemSchema = mongoose.Schema({

     orderid     : String,
     productid    : String,
     productstocks : String,
     productname   : String,
     productprice  : String,
     productqty :  String,
     datetime:     String
    

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Orderitem', orderitemSchema);
