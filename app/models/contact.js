// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var contactSchema = mongoose.Schema({

     TypeContact  : String,
     contactUserId    : String,
     contactName        : String,
     contactEmail     : String,
     contactPhone     : String,
     contactMsg     : String,
     datetime     : String

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Contact', contactSchema);
