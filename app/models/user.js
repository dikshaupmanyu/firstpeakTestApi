// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    firstName : String,
    lastName  :  String,
    phone : String ,
    address : String ,
    datetime : String,
    user_role    : String,
    stripeChargeCustomerId : String,
    consult_status :String,
    token: String ,
    licenseData : String,
    customerData :{
            id : String,
            object : String,
            address_city : String,
            address_country : String,
            address_line1 : String,
            address_line1_check : String,
            address_line2 : String,
            address_state : String,
            address_zip : String,
            address_zip_check : String,
            brand : String,
            country : String,
            customer : String,
            cvc_check : String,
            dynamic_last4 : String,
            exp_month : String,
            exp_year : String,
            fingerprint : String,
            funding : String,
            last4 : String,
            metadata : String,
            name : String,
            tokenization_method : String
        },
    subscriptionId : String,
    subscriptionname : String,
    first_time_login :String,
    regsitertoken : String,

    local            : {
        email        : String,
        password     : String,
        stripeChargeCustomerId :String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    img              : {

        path: {
         type: String,
        },
         originalname: {
         type: String,
        }

    },
    licenseimg        : {

        path: {
         type: String,
        },
         originalname: {
         type: String,
        }

    }


});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
