// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var usersubscriptionSchema = mongoose.Schema({

    subscriptionid  : String,
    userid     : String,
    cutomerid : String,
    subscriptionplan : {
        id : String,
        object : String,
        amount : String,
        created : String,
        currency : String,
        interval : String,
        interval_count : String,
        livemode : String,
        metadata : {},
        name : String,
        statement_descriptor : String,
        trial_period_days : String,
    },
    subscriptionstatus : String,
    subscriptioncreate : String,
    subscriptionstart : String,
    subscriptionend : String,
    subscriptionitem :{     
        id : String,
        object : String,
        created : String,
        metadata : String,
        plan : {
            id : String,
            object : String,
            amount : String,
            created : String,
            currency : String,
            interval : String,
            interval_count : String,
            livemode : String,
            metadata : String,
            name : String,
            statement_descriptor : String,
            trial_period_days : String
        },
        quantity : String,
    }
    

});


// create the model for users and expose it to our app
module.exports = mongoose.model('UserSubscription', usersubscriptionSchema);
