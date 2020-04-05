// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var hpdetailSchema = mongoose.Schema({
    userid : String,
    fullname : String ,
    gender : String ,
    shipaddress : String,
    country    : String,
    administrative_area_level_1 : String,
    locality :String,
    postal_code: String ,
    mobile : String,
    ofcphone : String,
    email :String,
    licenseId : String,
    issueDate : String,
    expDate :String,
    whereHear : String,
    interested : String,
    datetime : String
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Hpdetail', hpdetailSchema);
