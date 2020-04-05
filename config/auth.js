// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
     'clientID'      : '183052039151290', // your App ID
     'clientSecret'  : '84d3f2925837367e108ea12bb55203ef', // your App Secret
     'callbackURL'   : 'https://greenliving.io/auth/facebook/callback',
     'profileFields'   : ['emails' , 'name'],
    // 'callbackURL'   : 'http://ec2-54-234-40-96.compute-1.amazonaws.com:5555/auth/facebook/callback'
    },

   // 'facebookAuth' : {
   //   'clientID'      : '176829086429693', // your App ID
   //   'clientSecret'  : '091d59b1a20da0ca113fb93ac2802ca3', // your App Secret
   //   'callbackURL'   : 'http://localhost:5555/auth/facebook/callback',
   //   'profileFields'   : ['emails' , 'name']
    
   //  },

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

   'googleAuth' : {
     'clientID'      : '447404350290-7gbla1es53mpjpes9m0muh6fdo42gq9u.apps.googleusercontent.com',
     'clientSecret'  : 'AELYOmMQjI-7lzKv3-xeOx1p',
     'callbackURL'   : 'https://greenliving.io/auth/google/callback'
    }
    
    // 'googleAuth' : {
    //  'clientID'      : '398468118292-698n0hckgllvp0cr2mr409du57ft0m9m.apps.googleusercontent.com',
    //  'clientSecret'  : 'IZO9aX-MVooTiAXmSNBU7pxT',
    //  'callbackURL'   : 'http://greenliving.io:5555/auth/google/callback'
    // }

    // 'googleAuth' : {
    //  'clientID'      : '1032059926559-nutd08ud212ad4lektgje3gpuivkrjps.apps.googleusercontent.com',
    //  'clientSecret'  : 'MyA9jZlW67xfZGj8tz8c_lmF',
    //  'callbackURL'   : 'http://localhost:5555/auth/google/callback'
    // }

};