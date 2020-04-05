// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var productSchema = mongoose.Schema({

     productname        : String,
     productprice     : String,
     productdescr     : String,
     productcategory     : String,
     prosize     : String,
     total_stock : String,
     datetime     : String,
     productfulldescr     : String,
     addInfo     : String,
     productname_chineese     : String,
     producttype     : String,
     prostatus : String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Products', productSchema);
