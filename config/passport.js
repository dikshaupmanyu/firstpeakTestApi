// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../app/models/user');

var Addsymptoms       = require('../app/models/addsymptom');

var Addsymptomsfemales       = require('../app/models/addsymptomfemale');

var Product       = require('../app/models/products');

var Order       = require('../app/models/orders');

var Orderitem       = require('../app/models/orderitem');

var Consult       = require('../app/models/consults');

var Transactions       = require('../app/models/transaction');

var UserSubscription       = require('../app/models/usersubscription');

var Symptom       = require('../app/models/symptoms');

var Refund       = require('../app/models/refunds');

var Consultreplys       = require('../app/models/consultreply');

var md5 = require('md5');

var format = /[+\-\/?]+/;


// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous

        process.nextTick(function() {

            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
               // console.log(user.local.password);
                // console.log(md5(req.body.password));

                if (!user){
                    return done(null, false, req.flash('loginMessage', 'No user found.'));                   
                } else {

               

                 if (user.regsitertoken == ""){

                    if(user.user_role === 'health-provider'){

                        if(user.first_time_login === 'True'){

                         return done(null, false, req.flash('loginMessage', 'Admin cannot activate your account.'));

                        } else {

                            if (err)
                                return done(null, false, req.flash('loginMessage', 'No user found.'));

                            // if no user is found, return the message
                            if (!user)
                                return done(null, false, req.flash('loginMessage', 'No user found.'));

                            if (user.local.password != md5(password))
                                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                            // all is well, return user
                            else
                                return done(null, user);

                             }

                        } else {

                            // if no user is found, return the message
                            if (!user)
                                // console.log('No user found.');
                                return done(null, false, req.flash('loginMessage', 'No user found.'));                   

                            if (user.local.password != md5(req.body.password))
                                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                            // all is well, return user
                            else
                                return done(null, user);

                            }

                }else{

                     return done(null, false, req.flash('loginMessage', 'First Confirm your Email through your account.'));
 

                }

                 }

                


                
             
            });

        });

    }));


    //    passport.use('android-local-login', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    // },
    // function(req, email, password, done) {

    //     // asynchronous

    //      // asynchronous

    //     process.nextTick(function() {

    //         User.findOne({ 'local.email' :  email }, function(err, user) {
    //             // if there are any errors, return the error
    //            // console.log(user);

    //             if (!user){
    //                 return done(null, false, req.flash('loginMessage', 'No user found.'));                   
    //             }


    //             if(user.user_role === 'health-provider'){

    //                 if(user.first_time_login === 'True'){

    //                  return done(null, false, req.flash('loginMessage', 'Admin cannot activate your account.'));

    //                 } else {

    //                         if (err)
    //                             return done(null, false, req.flash('loginMessage', 'No user found.'));

    //                         // if no user is found, return the message
    //                         if (!user)
    //                             return done(null, false, req.flash('loginMessage', 'No user found.'));

    //                         if (!user.validPassword(password))
    //                             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

    //                         // all is well, return user
    //                         else
    //                             return done(null, user);

    //                 }

    //             } else {

    //             // if no user is found, return the message
    //             if (!user)
    //                 return done(null, false, req.flash('loginMessage', 'No user found.'));                   

    //             if (!user.validPassword(password))
    //                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

    //             // all is well, return user
    //             else
    //                 return done(null, user);

    //             }
             
    //         });

    //     });
    // }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
      //  user_roleField : 'user_role',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
      //  console.log(req.body.password);
      //  console.log(req.body.cpassword);
        // asynchronous

      // if(format.test(req.body.email)){

      //   return done(null, false, req.flash('signupMessage', 'Please enter email without + sign '));

      // }  else {


        if(req.body.password === req.body.cpassword){

            process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({ $or: [{'local.email': email},{'google.email' : email},{'facebook.email' : email}]}, function(err, existingUser) {
                // if there are any errors, return the error
            //   console.log(existingUser);

                if (err)
                    return done(err);
                  //  console.log("err");
                    //console.log(email);        

                // check to see if there's already a user with that email
                if (existingUser) 
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                   // console.log("existingUser");
                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                   // console.log(req.user);
                    var user            = req.user;
                    user.user_role   = req.body.user_role;
                    user.firstName   = req.body.firstName;
                    user.local.email    = email;
                    user.local.password = md5(password);
                    user.regsitertoken = req.body.regsitertoken;
                    user.img.originalname = "usericon.jpg";
                    user.licenseimg.originalname = "new-brunswick-drivers-licence.jpg";
                    user.first_time_login = req.body.first_time_login;
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                       // console.log("user");
                    });
                } 
                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();
                    newUser.user_role      = req.body.user_role;
                    newUser.firstName      = req.body.firstName;
                    newUser.local.email    = email;
               //     bcrypt.hashSync("bacon")
                    newUser.local.password =  md5(password);
                    newUser.regsitertoken = req.body.regsitertoken;
                    newUser.img.originalname = "usericon.jpg";
                    newUser.licenseimg.originalname = "new-brunswick-drivers-licence.jpg";
                    newUser.first_time_login = req.body.first_time_login;


                    newUser.save(function(err) {
                     //   console.log(newUser);
                        if (err)
                           // console.log(err);
                            throw err;
                        
                    return done(null, false, req.flash('signupMessage', 'Please check your email and follow instructions.' ));

                        // return done(null, newUser);
                       // console.log("newUser");
                
                    });
                }

            });
        });

        } else {
         
       return done(null, false, req.flash('signupMessage', 'Password Not Match !!!'));

        }
      // }  

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : configAuth.facebookAuth.profileFields,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ $or: [{'local.email': profile.emails[0].value},{'google.email': profile.emails[0].value},{ 'facebook.id' : profile.id }]}, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.user_role      = "user";
                            user.img.originalname = "usericon.jpg";
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();
                        newUser.user_role      = "user";
                        newUser.img.originalname = "usericon.jpg";
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                        
                          var aws = require('aws-sdk');
                                aws.config.loadFromPath('newconfig.json');
                                var ses = new aws.SES({apiVersion: '2010-12-01'});
                                    var to = [newUser.facebook.email]
                                    var from = 'health@greenliving.io'
                                    console.log(to);
                                    ses.sendEmail( 
                                      { 
                                        Source: from, 
                                        Destination: { ToAddresses: to },
                                        Message: {
                                          Subject: {
                                            Data: 'Registration Verification'
                                          },
                                          Body: {
                                            Html: {
                                            Data: "<b>"+ "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><p>Dear "+ newUser.facebook.name +",</p><p>Thank you for signing up to GreenLiving.</p><p>GreenLiving offers the following services:</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>Consultation</th><td>FREE</td></tr><tr><th scope='col' style='text-align: left;'>Herbal Supplement : </th><td>minimum 1 dosage (5 doses) US$ 13.99/dosage + FREE shipping(via USPS First Class Mail)</td></tr><tr><th scope='col' style='text-align: left;'>Laser Therapy : </th><td>US$ 4.99/treatment via mobile app</td></tr></table></div><p>If you have any questions or you need further assistance, please feel free to contact us at</p><p>GreenLiving.xxx</p><p>Thanks,</p><p>GreenLiving.team</p><p>IMPORTANT: If you have a medical emergency, please call 911 or go to your nearest hospital for help.</p>" +"</b>" // html body',
                                            }
                                          }
                                        }
                                      }).promise();
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
                user.user_role      = "user";
                user.img.originalname = "usericon.jpg";
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }
        });

    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    // passport.use(new TwitterStrategy({

    //     consumerKey     : configAuth.twitterAuth.consumerKey,
    //     consumerSecret  : configAuth.twitterAuth.consumerSecret,
    //     callbackURL     : configAuth.twitterAuth.callbackURL,
    //     passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    // },
    // function(req, token, tokenSecret, profile, done) {

    //     // asynchronous
    //     process.nextTick(function() {

    //         // check if the user is already logged in
    //         if (!req.user) {

    //             User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
    //                 if (err)
    //                     return done(err);

    //                 if (user) {
    //                     // if there is a user id already but no token (user was linked at one point and then removed)
    //                     if (!user.twitter.token) {
    //                         user.twitter.token       = token;
    //                         user.twitter.username    = profile.username;
    //                         user.twitter.displayName = profile.displayName;

    //                         user.save(function(err) {
    //                             if (err)
    //                                 throw err;
    //                             return done(null, user);
    //                         });
    //                     }

    //                     return done(null, user); // user found, return that user
    //                 } else {
    //                     // if there is no user, create them
    //                     var newUser                 = new User();

    //                     newUser.twitter.id          = profile.id;
    //                     newUser.twitter.token       = token;
    //                     newUser.twitter.username    = profile.username;
    //                     newUser.twitter.displayName = profile.displayName;

    //                     newUser.save(function(err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });

    //         } else {
    //             // user already exists and is logged in, we have to link accounts
    //             var user                 = req.user; // pull the user out of the session

    //             user.twitter.id          = profile.id;
    //             user.twitter.token       = token;
    //             user.twitter.username    = profile.username;
    //             user.twitter.displayName = profile.displayName;

    //             user.save(function(err) {
    //                 if (err)
    //                     throw err;
    //                 return done(null, user);
    //             });
    //         }

    //     });

    // }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {                             

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

      //  User.findOne({'google.id' : profile.id }, function(err, user) {
 
        User.findOne({ $or: [{'local.email': profile.emails[0].value},{ 'google.id' : profile.id },{ 'facebook.email' : profile.emails[0].value }]}, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.user_role    = "user";
                            user.img.originalname = "usericon.jpg";
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);

                    } else {
                        var newUser          = new User();
                        newUser.user_role    = "user";
                        newUser.img.originalname = "usericon.jpg";
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });

                          var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                        var to = [newUser.google.email]
                        var from = 'health@greenliving.io'
                        console.log(to);
                        ses.sendEmail( 
                          { 
                            Source: from, 
                            Destination: { ToAddresses: to },
                            Message: {
                              Subject: {
                                Data: 'Registration Verification'
                              },
                              Body: {
                                Html: {
                                Data: "<b>"+ "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><p>Dear "+ newUser.google.name +",</p><p>Thank you for signing up to GreenLiving.</p><p>GreenLiving offers the following services:</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>Consultation</th><td>FREE</td></tr><tr><th scope='col' style='text-align: left;'>Herbal Supplement : </th><td>minimum 1 dosage (5 doses) US$ 13.99/dosage + FREE shipping(via USPS First Class Mail)</td></tr><tr><th scope='col' style='text-align: left;'>Laser Therapy : </th><td>US$ 4.99/treatment via mobile app</td></tr></table></div><p>If you have any questions or you need further assistance, please feel free to contact us at</p><p>GreenLiving.xxx</p><p>Thanks,</p><p>GreenLiving.team</p><p>IMPORTANT: If you have a medical emergency, please call 911 or go to your nearest hospital for help.</p>" +"</b>" // html body',
                                }
                              }
                            }
                          }).promise();
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session
                user.user_role    = "user";
                user.img.originalname = "usericon.jpg";
                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

};
