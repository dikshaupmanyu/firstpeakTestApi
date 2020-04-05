// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var consultimagereplySchema = mongoose.Schema({

    consult_id : String,
    img        : {

        path: {
         type: String,
        },
         originalname: {
         type: String,
        }

    },
    backimg        : {

        path: {
         type: String,
        },
         originalname: {
         type: String,
        }

    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Consultimagereply', consultimagereplySchema);
