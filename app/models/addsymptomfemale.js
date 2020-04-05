// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var addsymptomfemaleSchema = mongoose.Schema({

     gender                      : String,
     bodypartfemale              : String,
     affectedareafemale          : String,
     symptomfemale               : String,
     symptomdescriptionfemale    : String,
     medincinenamefemale         : String

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Addsymptomfemale', addsymptomfemaleSchema);
