// server.js

// set up ======================================================================
// get all the tools we need
// delete process.env["DEBUG_FD"];

var compression = require('compression')
var express  = require('express');
var bodyParser = require('body-parser');
var app      = express();
var port     = process.env.PORT || 5555;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var responseTime = require('response-time');
var redis = require('redis');
var cors = require('cors');
var request = require('request');
var http = require('http');
var Base64 = require('Base64');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var StreamChat = require('stream-chat').StreamChat;
// mongoose.connect("mongodb://ec2-34-207-120-143.compute-1.amazonaws.com:27017/dummyDB", {
//     "auth": { "authSource": "admin" },
//     "user": "meenal",
//     "pass": "meenal",
//     "useMongoClient": true
// });
 // var configDB = require('./config/database.js');

// configuration ===============================================================
 // mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(compression());
	app.use(cors());
	app.use(responseTime());
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
	app.use((req, res, next) => {
	  res.header('Access-Control-Allow-Origin', '*');
	  next();
	});

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


var serverClient = new StreamChat(
    'g8yfg5w2yd32', 
    '7mp4nybxphk5rzm9x72v3ah96nqc3wmy3sz8a8pbyhu4pbdsxvbqdkdsfpdmz8da'
);

app.get('/token', (req, res) => {
    const { username } = req.query

    if (username) {
        const token = serverClient.createToken(username)
        res.status(200).json({ token, status: "sucess" })
    } else {
        res.status(401).json({ message: "invalid request", status: "error" })
    }
});

app.post('/updateUser', async (req, res) => {
    const { userID } = req.body
    if (userID) {
        const updateResponse = await serverClient.updateUsers([{ 
            id: userID, 
            role: 'admin'
         }]);
    
        res.status(200).json({ user: updateResponse, status: "sucess" })
    } else {
        res.status(401).json({ message: "invalid request", status: "error" })
    }
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
