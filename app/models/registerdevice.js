
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var registerdeviceSchema = mongoose.Schema({
    UserId : String,
    DeviceSecureId  :  String,
    PushChannel :String,
    Platform :String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('RegisterDevice', registerdeviceSchema);
