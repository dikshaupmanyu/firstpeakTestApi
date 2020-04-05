// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var consultsSchema = mongoose.Schema({

     user_id :String,
    // problem : String,
    // problemdetail : String,
    // problemarea : String,
    symptom_ruing : String,
    symptom_thirty : String,
    symptom_cough : String,
    symptom1 : String,
    btemp: String,
    btime : String,
    bside : String,
    body : String,
    headache : String,
    sweatPain : String,
    sweatTime : String,
    sleep : String,
    sleepTime : String,
    bmove : String,
    constipation : String,
    btype : String,
    bWater : String,
    bSmell : String,
    bColor : String,
    urnieType : String,
    ployuria : String,
    urnieColor : String,
    urnieSmell : String,
    chest : String,
    stomach : String,
    dailyDietWater : String,
    dailyDietDrink : String,
    dailyDietFood : String,
    menstruation : String,
    menstruationColor : String,
    menstruationPain : String,
    menstruationVolume : String,
    age : String,
    addinfo : String,
    preferTreatment : String,
    treatmentFeedback : String,
    locationPain : String,
    datetime : String,
    view_consult_status : String,
    consult_status : String,
    read_status :String,
    doctor_read_status :String,
    myimage: {
			 originalname: {
			 type: String
			 }
	 }
    		

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Consults', consultsSchema);
