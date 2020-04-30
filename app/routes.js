module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

  app.get('/commentlist', function(req, res) {

    res.render('commentlist.ejs');
  });

  app.get('/updateData', function(req, res) {

    var status = req.query.status;
    var userid = req.query.id;
    var tokenval = req.query.tokendata;

    var fs = require("fs");
       let rawdata = fs.readFileSync('public/json/userdetail.json');
       let userdetail = JSON.parse(rawdata);
    
        var userdetailt = { status : req.query.status};

        let data = JSON.stringify(userdetailt, null, 2);

        fs.writeFile('public/json/userdetail.json', data, (err) => {
             if (err) throw err;
             console.log(data);
        });            
        
       return res.redirect("/userlist?tokendata="+tokenstatus);



    res.render('editUser.ejs');
  });


  app.get('/csvlist', function(req, res) {

    var fs = require("fs");
    var arrayOfFilesc;

    try {
      var arrayOfFiles = fs.readdirSync("./public/csv");
      console.log(arrayOfFiles);
    } catch(e) {
      console.log(e);
    }

    res.render('csvlist.ejs' , {data : arrayOfFiles});
  });


  app.get('/Bushwickwordstatus', function (req, res , done) {
   // console.log(res);
    
    var statusdata = req.query.status;
    // var tokenstatus = req.query.tokenval;        
     var fs = require("fs");
       let rawdata = fs.readFileSync('public/json/bushwickWord.json');
       let userdetail = JSON.parse(rawdata);
        // let userdetailNew = JSON.parse(userdetail);
        // console.log(userdetail);  
        // console.log(userdetail.status);
        var userdetailt = { status : statusdata};

        let data = JSON.stringify(userdetailt, null, 2);

        fs.writeFile('public/json/bushwickWord.json', data, (err) => {
             if (err) throw err;
             console.log(data);
        });            
        
         // return res.redirect("/csvlist?tokendata="+tokenstatus);


  });

  app.get('/Userimage', function (req, res , done) {
   

   // console.log(res);

   var btoa = require("btoa");
   // var Base64 = require('js-base64').Base64;

   var finaldata = req.query;

   var Base64 = require('base64-string').Base64;
// other code
    var enc = new Base64();
     var b64 = enc.urlEncode(req.query);

    console.log(Base64(finaldata));

    // res.send(200);
     res.on("data", function(chunk) {
       //this is body
       // console.log(chunk);
  });
    

  });


  app.get('/Seanwordstatus', function (req, res , done) {
   // console.log(res);
    
    var statusdata = req.query.status;
    // var tokenstatus = req.query.tokenval;        
     var fs = require("fs");
       let rawdata = fs.readFileSync('public/json/seanWord.json');
       let userdetail = JSON.parse(rawdata);
        // let userdetailNew = JSON.parse(userdetail);
        // console.log(userdetail);  
        // console.log(userdetail.status);
        var userdetailt = { status : statusdata};

        let data = JSON.stringify(userdetailt, null, 2);

        fs.writeFile('public/json/seanWord.json', data, (err) => {
             if (err) throw err;
             console.log(data);
        });            
        
         // return res.redirect("/csvlist?tokendata="+tokenstatus);


  });

   app.get('/seanblackliststatus', function (req, res , done) {
   // console.log(res);
    
    var statusdata = req.query.status;
    // var tokenstatus = req.query.tokenval;        
     var fs = require("fs");
       let rawdata = fs.readFileSync('public/json/seanBlack.json');
       let userdetail = JSON.parse(rawdata);
        // let userdetailNew = JSON.parse(userdetail);
        // console.log(userdetail);  
        // console.log(userdetail.status);
        var userdetailt = { status : statusdata};

        let data = JSON.stringify(userdetailt, null, 2);

        fs.writeFile('public/json/seanBlack.json', data, (err) => {
             if (err) throw err;
             console.log(data);
        });            
        
         // return res.redirect("/csvlist?tokendata="+tokenstatus);


  });


   app.get('/bushwickBlackStatus', function (req, res , done) {
   // console.log(res);
    
    var statusdata = req.query.status;
    // var tokenstatus = req.query.tokenval;        
     var fs = require("fs");
       let rawdata = fs.readFileSync('public/json/bushwikBlack.json');
       let userdetail = JSON.parse(rawdata);
        // let userdetailNew = JSON.parse(userdetail);
        // console.log(userdetail);  
        // console.log(userdetail.status);
        var userdetailt = { status : statusdata};

        let data = JSON.stringify(userdetailt, null, 2);

        fs.writeFile('public/json/bushwikBlack.json', data, (err) => {
             if (err) throw err;
             console.log(data);
        });            
        
         // return res.redirect("/csvlist?tokendata="+tokenstatus);


  });



	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

  app.get('/help',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('help.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
  
  });


app.get('/disclaimer',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('disclaimer.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
  
  });


app.get('/faq',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('faq.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
  
  });


app.get('/return',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('return.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
  
  });

app.get('/privacy',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('privacy.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
  
  });

  app.get('/male', isLoggedIn, function(req, res) {
    var consultreplyid = req.query.consultreplyId;
    var userid = req.query.consultreplyId;
    var consult_id = req.query.consult_id;
    res.render('male.ejs', {
      user : req.user , urldataconsultreply : consultreplyid, urluserid : userid , urlconsultid : consult_id
    });
  });


app.get('/backmale', isLoggedIn, function(req, res) {
    var consultreplyid = req.query.consultreplyId;
    var userid = req.query.consultreplyId;
    var consult_id = req.query.consult_id;
    res.render('backmale.ejs', {
      user : req.user , urldataconsultreply : consultreplyid, urluserid : userid , urlconsultid : consult_id
    });
  });

  

    //   var fs =  require('fs');
    // var express = require('express');
    // var multer = require('multer');
    // var upload = multer({ dest: 'public/uploads/consutlreply/front'});
    app.post('/image-upload-consultrply',  function(req, res ) {
      
        console.log(req.body.newvalues);
        console.log(req.body.consid);
      
     var Consultreplys  = require('../app/models/consultreply');
     var ConsultImagereply  = require('../app/models/consultimagereply');
     //  var _id = req.body.consultreplyId;
        var userId = req.body.userid;
        var consult_id = req.body.consid;
        //console.log(consultId);
      // var file = 'public/uploads/consutlreply/front/' + req.files.image.originalname + randomstring + ".jpg";
        var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
      var User       = require('../app/models/user');
      var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

         //  console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

    //  fs.rename(req.files.image.path, file, function(err) {
        // if (err) {
        //   // console.log(err);
            
        //   // return res.redirect("list-consult-reply?id="+consultId );

        //   return res.redirect('reply-consult?id='+consult_id);


        // } else {
      var parts = req.body.newvalues.split('/');
      var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

      console.log(lastSegment);    

     var imageName = lastSegment;
     // console.log(imageName);
     var newpath = req.body.newvalues;
     
     var imagepath = {};
     imagepath['originalname'] = imageName;
     imagepath['path'] = newpath;

     var nimagepath = {};
     nimagepath['originalname'] = "null";
     nimagepath['path'] = "null";

    // var set = {img:imagepath};
  //  var _id = req.body.consultreplyId;
    // console.log(_id);

    var consult_id = req.body.consid;
     console.log(consult_id);

        //  console.log(dataa);

         ConsultImagereply.find({"consult_id": req.body.consid}, function (err, dataa) {

           console.log(dataa);

          if(dataa != ""){

            console.log("true");


              ConsultImagereply.update(
                  { consult_id: req.body.consid },
                  { $set: {img:imagepath} 
               },
                  function (err, doc) {
                     console.log(doc); 
        
                  });  

          }else{

               console.log("false");


              var set = {   
                  consult_id : req.body.consid,         
                   img : imagepath
              };

               // console.log(set);
              var consultimagereply = new ConsultImagereply(set); 
              consultimagereply.save(function(error, datas){
             
                console.log(datas);

               });

          }
      

               

      });

      return res.redirect('/reply-consult?id='+consult_id); 
       
       // }

     // });
   
  });

      

   });

//////////////////////////////////////////////////////////////////////
 
      var fs =  require('fs');
    var express = require('express');
    var multer = require('multer');
    var upload = multer({ dest: 'public/uploads/consutlreply/back'});
    app.post('/image-upload-consultrply-back',  function(req, res , data) {
       // console.log(res); 
       // console.log(req.files);
        console.log(req.body.newvalues);
        console.log(req.body.consid);
      
     var Consultreplys  = require('../app/models/consultreply');
     var ConsultImagereply  = require('../app/models/consultimagereply');

       // var _id = req.body.consultreplyId;
        var userId = req.body.userid;

        var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
      var User       = require('../app/models/user');
      var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

     var parts = req.body.newvalues.split('/');
      var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

     console.log(lastSegment);    

     var imageName = lastSegment;
     
     var newpath = req.body.newvalues;
     
     var imagepath = {};
     imagepath['originalname'] = imageName;
     imagepath['path'] = newpath;

     var nimagepath = {};
     nimagepath['originalname'] = "null";
     nimagepath['path'] = "null";

     //var set = {backimg:imagepath};

     var consult_id = req.body.consid;
     console.log(consult_id);

     ConsultImagereply.find({"consult_id" : req.body.consid}, function (err, dataa) {

      // console.log(err);
     // console.log(dataa);

          if(dataa){

              ConsultImagereply.update(
                  { consult_id: req.body.consid },
                  { $set: {backimg:imagepath} 
               },
                  function (err, doc) {
                     console.log(doc); 
        
                  });  

          }else{


              var set = {   
                  consult_id : req.body.consid,         
                   backimg : imagepath
              };

               // console.log(set);
              var consultimagereply = new ConsultImagereply(set); 
              consultimagereply.save(function(error, datas){
             
                console.log(datas);

               });

          }


        });
   
      return res.redirect('/reply-consult?id='+consult_id); 
          
     
  });

      

   });


//////////////////////////////////////////////////////////////////////////

   var fs =  require('fs');
    var express = require('express');
    var multer = require('multer');
    var upload = multer({ dest: 'public/uploads/consutlreply'});
    app.get('/deletecanvas',  function(req, res , data) {
      console.log(res);
     var Consultreplys  = require('../app/models/consultreply');
         var _id = req.query.consultreplyid;
         // var userId = req.body.userid;
          var consultId = req.query.consult_id;
        var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
      var User       = require('../app/models/user');
      var Consult       = require('../app/models/consults');

        // console.log(imageName);
    

     var set = {img:""};
    var _id = req.query.consultreplyid;
    console.log(_id);

         Consultreplys.findById(_id, function (err, user) {
      

                 Consultreplys.update(
                  { _id: _id },
                  { $set: {img:""} 
               },
                  function (err, doc) {
                     console.log(doc); 
        
                  });  

      });

      return res.redirect('reply-consult?id='+consultId);
       

      });


    /////////////////////////////////////////////

    var fs =  require('fs');
    var express = require('express');
    var multer = require('multer');
    var upload = multer({ dest: 'public/uploads/consutlreply'});
    app.get('/deletebackcanvas',  function(req, res , data) {
      console.log(res);
     var Consultreplys  = require('../app/models/consultreply');
         var _id = req.query.consultreplyid;
         // var userId = req.body.userid;
          var consultId = req.query.consult_id;
        var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
      var User       = require('../app/models/user');
      var Consult       = require('../app/models/consults');

        // console.log(imageName);
    

     var set = {backimg:""};
    var _id = req.query.consultreplyid;
    console.log(_id);

         Consultreplys.findById(_id, function (err, user) {
      

                 Consultreplys.update(
                  { _id: _id },
                  { $set: {backimg:""} 
               },
                  function (err, doc) {
                     console.log(doc); 
        
                  });  

      });

      return res.redirect('reply-consult?id='+consultId);
       

      });
   
     
  // PROFILE SECTION =========================

 app.post('/consultsreplyapi', function(req, res) {
  // console.log("hii");
   // console.log(req);
          var User       = require('../app/models/user');
           var Consult       = require('../app/models/consults');
           var Consultreplys       = require('../app/models/consultreply');
            var dates=  new Date();
            var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
            //var base64 = require('base-64');
            var Base64 = require('js-base64').Base64;

             var imagepath = {};
             imagepath['originalname'] = "null";
             imagepath['path'] = "null";

             var nimagepath = {};
             nimagepath['originalname'] = "null";
             nimagepath['path'] = "null";


            var set = {
               product_id: req.body.product_id,
               consult_id: req.body.consult_id,
               consult_status: "Answered",
               comment: Base64.encode(req.body.comment),
               datetime: strDate,
               frequency1 : req.body.frequency1,
               frequency2 : req.body.frequency2,
               backimg : imagepath,
               img : nimagepath
            };

           // console.log(set);
           var consultreply = new Consultreplys(set); 
          consultreply.save(function(error, datas){
          if(error){
              //res.json({status:500 , error});
              res.status(500).json({ status :500, error});

          }
          else{

           // console.log(datas);
     
            var _id = req.body.consult_id;
                 
            var setss = {consult_status:"Answered",view_consult_status: "1"};

             Consult.update(
                { _id: req.body.consult_id },
                { $set: setss },
                function (err, doc) {
                  
                if (err){
                  //res.send({ status : 500 , err });
                  res.status(500).json({ status :500, err});

                } else {

                  res.status(200).json({ status :200, doc});
                 // res.send({ status :200 , doc });
                }     
           
                });


           }


      });     
    
  });

  app.post('/RegisterDevice', function(req, res) {
  // console.log("hii");
   // console.log(req);
           var User       = require('../app/models/user');
           var RegisterDevice       = require('../app/models/registerdevice');

            var set = {
              UserId: req.body.UserId,
              DeviceSecureId: req.body.DeviceSecureId,
              PushChannel: req.body.PushChannel,
              Platform: req.body.Platform
        
            };

          var registerdevice = new RegisterDevice(set); 
         
          registerdevice.save(function(error, datas){
          if(error){
            
              //res.send({status : 500 , error});
              res.status(500).json({ status :500, error});

          }
          else{

             //res.send({status : 200 , datas});
             res.status(200).json({ status :200, datas});


           }


      });     
    
  });


  app.get('/homes', isLoggedIn, function(req, res) {
      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
         //  console.log(req.user);

      if(req.user.first_time_login === "False"){
            
            // $('#myModal-terms').modal('show');

            var loggedin = "false" ;
            console.log(loggedin);

        } else {

           var loggedin = "true";
           console.log(loggedin);

        }

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('homes.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult, finalloggedinvalue : loggedin ,});

      });

      });
    
  });



	app.get('/home',  function(req, res) {

    // console.log(req);
     
        res.render('home.ejs');
     
		
	});

  app.get('/userlist',  function(req, res) {

        res.render('userlist.ejs');
     
    
  });

   app.get('/flaglist',  function(req, res) {

        res.render('flaglist.ejs');
     
    
  });


    app.get('/ConsultById/:userid', function(req, res) {
     // console.log(req.params.userid);

    // var base64 = require('base-64');
    var Base64 = require('js-base64').Base64;

      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults'); 
    var User       = require('../app/models/user');

      Consult.find({user_id: req.params.userid }, function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++)
          {
              vm.allconsults[i] = consult[i];
          consult[i].problem= Base64.decode(consult[i].problem);  
          consult[i].problemdetail = Base64.decode(consult[i].problemdetail);
         // console.log(consultproblemdetailall[i]);
         consult[i].problemarea = Base64.decode(consult[i].problemarea);        
            // console.log(consult[i].myimage);
        // consult[i].myimage.originalname = "http://greenliving.io:5555/uploads/consults/"+consult[i].myimage.originalname;
         consult[i].datetime =  consult[i].datetime;   
          }
             if(err){

                 //res.send({ status :500, error: "Failed to get all consults"});

                 res.status(500).json({ status :500, error: "Failed to get all consults"});


                 }else {


                 //res.send({ status :200, consult});

                 res.status(200).json({ status :200, consult});

             
 
                 }   
      });
    

     });


  app.get('/viewconsultreply/:consultid', function(req, res) {
    var consult_id = req.params.consultid;
   // console.log(consult_id);
       // var base64 = require('base-64');
        var Base64 = require('js-base64').Base64;

        var i = 0;
       var vm = this;
        vm.consultreply = null;
        vm.allconsultreplys = [];

      var Consultreplys       = require('../app/models/consultreply');

       Consultreplys.find({consult_id:req.params.consultid},function (err, consultreply) {

          // console.log(consultreply);
          for(var i = 0; i < consultreply.length; i++)
            {
            vm.allconsultreplys[i] = consultreply[i];
           consultreply[i].comment = Base64.decode(consultreply[i].comment);  
        //    consultreply[i].query =  base64.decode(consultreply[i].query);
          //   
           }

            if(err){

                // res.send({status : 500 , error: "There have no reply !!!!"});

                 res.status(500).json({ status :500, error: "There have no reply !!!!"});



                 }else {

                 res.status(200).json({ status :200, consultreply});
 

                // res.send({ status :200, consultreply});
             
 
                 }
           
      });

  });

    

	app.get('/order-medicine', function(req, res) {

		var i = 0;
		var vm = this;
        vm.product = null;
        vm.allProducts = [];

	  var Product       = require('../app/models/products');

   
      Product.find({'prostatus': '1'},function (err, product) {
  		// docs is an array
  		  for(var i = 0; i < product.length; i++){
            vm.allProducts[i] = product[i];


        }
 
       var productvalue = JSON.stringify(product);
       var jsonObject = JSON.parse(productvalue);


   
      res.render('order-medicine.ejs', {data: jsonObject,});

      });


	});

	app.get('/order-medicines', isLoggedIn, function(req, res) {

		    var i = 0;
        var vm = this;
        vm.product = null;
        vm.allProducts = [];
        var a = 0;
        vm.consult = null;
        vm.allconsults = [];
        var k = 0;
        vm.discount = null;
        vm.alldiscounts = [];

      var Consult       = require('../app/models/consults');
      var Product       = require('../app/models/products');
      var Discount       = require('../app/models/discount');

       var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;

        Discount.find(function (err, discount) {
        // docs is an array
          for(var k = 0; k < discount.length; k++){
              vm.alldiscounts[k] = discount[k];
              
          }   
         var productvaluediscount = JSON.stringify(discount);
         var jsonObjectdiscount = JSON.parse(productvaluediscount);
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

      //     console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
     //     console.log(finalstatusconsult);
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);
   
        Product.find({'prostatus': '1'},function (err, product) {
    		// docs is an array
    		  for(var i = 0; i < product.length; i++){
              vm.allProducts[i] = product[i];


          }
   
         var productvalue = JSON.stringify(product);
         var jsonObject = JSON.parse(productvalue);

      Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

   
      res.render('order-medicines.ejs', {data: jsonObject, user : req.user , loadconsultdata: totalconsult, totalreadconsultstatus : finalstatusconsult, datadiscount: jsonObjectdiscount});

      
    });

      });

	});
    

 });  

  });     



	app.get('/order-detail', function(req, res) {

		var i = 0;
		var vm = this;
        vm.product = null;
        vm.allProducts = [];
        vm.products = null;

	  var Product       = require('../app/models/products');

   
      Product.find({'prostatus': '1'},function (err, product) {
  		// docs is an array
  		  for(var i = 0; i < product.length; i++){
            vm.allProducts[i] = product[i];


        }
 
       var productvalues = JSON.stringify(product);
       var jsonObjects = JSON.parse(productvalues);

     	var id = req.query.id;

        Product.findById(id, function (err, products) {
       
            for(var i = 0; i < products.length; i++){
            vm.allProducts[i] = products[i];
        }


       var productvalue = JSON.stringify(products);
       var jsonObject = JSON.parse(productvalue);


  

  	 res.render('order-detail.ejs', {data: jsonObject,datas:jsonObjects,id:req.query.id,});



    });

	});


	});

		app.get('/order-details', isLoggedIn, function(req, res) {

		var i = 0;
		var vm = this;
        vm.product = null;
        vm.allProducts = [];
        vm.products = null;
        var a = 0;
        vm.consult = null;
        vm.allconsults = [];
         var k = 0;
        vm.discount = null;
        vm.alldiscounts = [];
         var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;

	  var Product       = require('../app/models/products');
    var Consult       = require('../app/models/consults');
    var Discount       = require('../app/models/discount');

     Discount.find(function (err, discount) {
        // docs is an array
          for(var k = 0; k < discount.length; k++){
              vm.alldiscounts[k] = discount[k];
              
          }   
         var productvaluediscount = JSON.stringify(discount);
         var jsonObjectdiscount = JSON.parse(productvaluediscount);


     Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
              if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          }
        //  console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);

   
      Product.find({'prostatus': '1'},function (err, product) {
  		// docs is an array
  		  for(var i = 0; i < product.length; i++){
            vm.allProducts[i] = product[i];


        }
 
       var productvalues = JSON.stringify(product);
       var jsonObjects = JSON.parse(productvalues);

     	var id = req.query.id;

        Product.findById(id, function (err, products) {
       
            for(var i = 0; i < products.length; i++){
            vm.allProducts[i] = products[i];
        }


       var productvalue = JSON.stringify(products);
       var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

  	 res.render('order-details.ejs', {data: jsonObject,datas:jsonObjects,loadconsultdata: totalconsult,id:req.query.id,user : req.user,totalreadconsultstatus : finalstatusconsult, datadiscount: jsonObjectdiscount});


    });

    });

	});


	});

  }); 

    });     

	app.get('/cart', function(req, res) {
		res.render('cart.ejs', {
		});
	});


  app.post('/update-terms', function (req, res) {

      var User       = require('../app/models/user');

                  var _id= req.body.userid;
                  var set = {first_time_login:"False"};
                  User.update(
                  { _id: _id },
                  { $set: set },
                  function (err, doc) {
                   // console.log(doc);
                  });     
        // return to login page with success message
           return res.redirect('/home');
         
  });

	app.get('/thanks', function(req, res) {
		res.render('thanks.ejs', {
		});
	});

	app.get('/carts', isLoggedIn, function(req, res) {
		  var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          //console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('carts.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

        });

      });
	});

	app.get('/order', isLoggedIn, function(req, res) {

	    var i = 0;
		var vm = this;
        vm.order = null;
        vm.allorders = [];
        var a = 0;
        vm.consult = null;
        vm.allconsults = [];
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;

      var Consult       = require('../app/models/consults');
     	var Order       = require('../app/models/orders');

   
      Order.find(function (err, order) {
  		// docs is an array
  		  for(var i = 0; i < order.length; i++){
            vm.allorders[i] = order[i];


        }
 
       var productvalue = JSON.stringify(order);
       var jsonObject = JSON.parse(productvalue);

         Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          }
         var finalstatusconsult = readstatuscount ; 
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

   
      res.render('order.ejs', {data: jsonObject, user : req.user,loadconsultdata: totalconsult,totalreadconsultstatus : finalstatusconsult,});

       });

      });

	});

});

	app.get('/manageorder', isLoggedIn, function(req, res) {

	    var i = 0;
		var vm = this;
        vm.order = null;
        vm.allorders = [];
        vm.user = null;
        vm.allusers = [];

		var Order       = require('../app/models/orders');
		var User       = require('../app/models/user');

		 User.find(function (err, user) {
  		// docs is an array
  		  for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);


   
      Order.find(function (err, order) {
  		// docs is an array
  		  for(var i = 0; i < order.length; i++){
            vm.allorders[i] = order[i];


        }
 
       var productvalue = JSON.stringify(order);
       var jsonObject = JSON.parse(productvalue);
   
      res.render('manageorder.ejs', {data: jsonObject, datauser: jsonObjectuser, user : req.user});

      });

	});

    });		

    	app.get('/admin', isLoggedIn, function(req, res) {

	    var i = 0;
		var vm = this;
        vm.order = null;
        vm.allorders = [];
        vm.user = null;
        vm.allusers = [];

		var Order       = require('../app/models/orders');
		var User       = require('../app/models/user');

		 User.find(function (err, user) {
  		// docs is an array
  		  for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);


   
   
      res.render('admin.ejs', { datauser: jsonObjectuser, user : req.user});

      });

	});


    app.get('/managetransaction', isLoggedIn, function(req, res) {

	    var i = 0;
		var vm = this;
        vm.transaction = null;
        vm.alltransactions = [];
        vm.user = null;
        vm.allusers = [];

		var Transaction       = require('../app/models/transaction');
		var User       = require('../app/models/user');

		 User.find(function (err, user) {
  		// docs is an array
  		  for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);


   
      Transaction.find(function (err, transaction) {
  		// docs is an array
  		  for(var i = 0; i < transaction.length; i++){
            vm.alltransactions[i] = transaction[i];


        }
 
       var productvaluetransaction = JSON.stringify(transaction);
       var jsonObjecttransaction = JSON.parse(productvaluetransaction);
   
      res.render('managetransaction.ejs', {data: jsonObjecttransaction, datauser: jsonObjectuser, user : req.user});

      });

	});

    });		 


	app.get('/consult', isLoggedIn, function(req, res , document) {
		

	    var i = 0;
      var k = 0;
		var vm = this;
        vm.consult = null;
        vm.allconsults = [];
         vm.consultreply = null;
        vm.allconsultreplys = [];
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;


	    var Consult       = require('../app/models/consults');
       var Consultreplys       = require('../app/models/consultreply');
    //  var base64 = require('base-64');
    var Base64 = require('js-base64').Base64;
   
     	 Consult.find().sort({"$natural": -1}).exec(function (err, consult) {
	  		// docs is an array
        var consultproblemall = [];
        var consultproblemdetailall = [];
         var consultproblemareaall = [];
         var consultfinalimage = [];
	  		  for(var i = 0; i < consult.length; i++){
	            vm.allconsults[i] = consult[i];
               if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){


                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          consultproblemall[i] = Base64.decode(consult[i].problem);  
          consultproblemdetailall[i] = Base64.decode(consult[i].problemdetail);
         // console.log(consultproblemdetailall[i]);
          consultproblemareaall[i] = Base64.decode(consult[i].problemarea);

         //  consultfinalimage[i] =  consult[i].myimage.originalname;        

	        }

      var totalconsultproblem = consultproblemall;
      var totalconsultproblemdetail = consultproblemdetailall;
      var totalconsultproblemarea = consultproblemareaall;
      var totalconsultfinalimage = consultfinalimage;


      var finalstatusconsult = readstatuscount ; 
	 
	    var productvalue = JSON.stringify(consult);
	    var jsonObject = JSON.parse(productvalue);

      
      Consultreplys.find(function (err, consultreply) {
        // docs is an array
        var consultquery = [];

          for(var k = 0; k < consultreply.length; k++){
              vm.allconsultreplys[k] = consultreply[k];
              
          consultquery[k] = Base64.decode(consultreply[k].query);  
         }

      var totalconsultquery = consultquery;
    
   
      var productvalueconsultreply = JSON.stringify(consultreply);
      var jsonObjectconsultreply = JSON.parse(productvalueconsultreply);

	   
	      res.render('consult.ejs', {data: jsonObject, dataconsultreply: jsonObjectconsultreply,  user : req.user , totalreadconsultstatus : finalstatusconsult, totalconsultproblems : consultproblemall, totalconsultproblemdetails : consultproblemdetailall, totalconsultproblemareas : consultproblemareaall, totalconsultfinalimages : consultfinalimage , totalconsultquery : consultquery});

      });

	});

});

  app.get('/list-consult-reply', isLoggedIn, function(req, res , document) {
    var consultid = req.query.id;
    var Consult       = require('../app/models/consults');
   // var base64 = require('base-64');

   Consult.findOne({'_id': req.query.id},function(err,consultt){
        //if(consultt.consult_status == 'Answered'){

           var set = {read_status: "1"};

                var _id= consultid;

                Consult.update(
                            { _id: _id },
                            { $set: set },
                            function (err, doc) {

                              console.log(doc);

                            });

        // }else{
        //   var set = {read_status: "0"};

        //         var _id= consultid;

        //         Consult.update(
        //                     { _id: _id },
        //                     { $set: set },
        //                     function (err, doc) {

        //                       console.log(doc);

        //                     });
        // }

   });

    //console.log(res);

               


   // var base64 = require('base-64');
   var Base64 = require('js-base64').Base64;


        var i = 0;
        var j = 0;
        var k = 0;
        var l = 0;
        var vm = this;
        vm.consult = null;
        vm.allconsults = [];
        vm.user = null;
        vm.allusers = [];
        vm.consultreply = null;
        vm.allconsultreplys = [];
        vm.product = null ;
        vm.allproducts = [];
        var answerstatuscount = 0 ;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;

        var consultproblemall = [];
        var consultproblemdetailall = [];
         var consultproblemareaall = [];
         var consultfinalimage =[];

      var Consult       = require('../app/models/consults');
      var Product       = require('../app/models/products');
      var User       = require('../app/models/user');
      var Consultreplys       = require('../app/models/consultreply');

       Product.find(function (err, product) {
        // docs is an array
          for(var l = 0; l < product.length; l++){
              vm.allproducts[l] = product[l];
          }
   
         var productvalueproduct = JSON.stringify(product);
         var jsonObjectproduct = JSON.parse(productvalueproduct);

       Consultreplys.find(function (err, consultreply) {
        // docs is an array
          for(var k = 0; k < consultreply.length; k++){
              vm.allconsultreplys[k] = consultreply[k];
          }
   
         var productvalueconsultreply = JSON.stringify(consultreply);
         var jsonObjectconsultreply = JSON.parse(productvalueconsultreply);

          console.log(jsonObjectconsultreply);


      User.find(function (err, user) {
        // docs is an array
          for(var j = 0; j < user.length; j++){
              vm.allusers[j] = user[j];
          }
   
         var productvalueuser = JSON.stringify(user);
         var jsonObjectuser = JSON.parse(productvalueuser);

   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];
          consultproblemall[i] = Base64.decode(consult[i].problem);  
          consultproblemdetailall[i] = Base64.decode(consult[i].problemdetail);
         // console.log(consultproblemdetailall[i]);
          consultproblemareaall[i] = Base64.decode(consult[i].problemarea);        
            // console.log(consult[i].myimage);
          // consultfinalimage[i] = consult[i].myimage.originalname;
               if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          }

             var totalconsultproblem = consultproblemall;
       var totalconsultproblemdetail = consultproblemdetailall;
       var totalconsultproblemarea = consultproblemareaall;
       var totalconsultimage = consultfinalimage;

   
          var finalstatusconsult = readstatuscount ;
   
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);


   Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {
        // docs is an array
                //console.log(totalconsult.length);
    
     
        res.render('list-consult-reply.ejs', {loadconsultdata : totalconsult , dataproduct : jsonObjectproduct , data: jsonObject, datauser : jsonObjectuser , dataconsultreply :jsonObjectconsultreply , user : req.user , consultid : req.query.id , totalreadconsultstatus : finalstatusconsult,totalconsultproblems : totalconsultproblem , totalconsultproblemdetails : totalconsultproblemdetail , totalconsultproblemareas : totalconsultproblemarea, totalconsultimages : totalconsultimage,});

      });

 });

  });

  });

  });

   });    




  app.get('/reply-consult', isLoggedIn, function(req, res , document) {
   var Consult       = require('../app/models/consults');

  var consultid = req.query.id;

         

   // var base64 = require('base-64');  
   Consult.findOne({'_id': consultid},function(err,consultt){
   // consult_status:"Answered",view_consult_status: "1"
        //if(consultt.consult_status == 'Answered'){

           var set = {doctor_read_status: "1" , view_consult_status: "1"};

                var _id= consultid;

                Consult.update(
                            { _id: _id },
                            { $set: set },
                            function (err, doc) {

                              console.log(doc);

                            });

        // }else{
        //   var set = {read_status: "0"};

        //         var _id= consultid;

        //         Consult.update(
        //                     { _id: _id },
        //                     { $set: set },
        //                     function (err, doc) {

        //                       console.log(doc);

        //                     });
        // }

   });

   
   var Base64 = require('js-base64').Base64;


        var i = 0;
        var j = 0;
        var k = 0;
        var l = 0 ;
        var vm = this;
        vm.consult = null;
        vm.allconsults = [];
        vm.user = null;
        vm.allusers = [];
        vm.product = null;
        vm.allproducts = [];
         vm.consultimagereply = null;
        vm.allconsultimagereplys = [];
		vm.consultreply = null;
        vm.allconsultreplys = [];
         var answerstatuscount = 0 ;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;

      var consultproblemall = [];
        var consultproblemdetailall = [];
         var consultproblemareaall = [];
         var consultfinalimage =[];
   

      var Consult       = require('../app/models/consults');
      var User       = require('../app/models/user');
      var Product       = require('../app/models/products');
      var ConsultImagereply       = require('../app/models/consultimagereply');
	  var Consultreplys       = require('../app/models/consultreply');


      Product.find(function (err, product) {
        // docs is an array
          for(var k = 0; k < product.length; k++){
              vm.allproducts[k] = product[k];
          }
   
         var productvalueproduct = JSON.stringify(product);
         var jsonObjectproduct = JSON.parse(productvalueproduct);

     ConsultImagereply.find(function (err, consultimagereply) {
        // docs is an array
          for(var l = 0; l < consultimagereply.length; l++){
              vm.allconsultimagereplys[l] = consultimagereply[l];
          }
   
         var productvalueconsultimagereply = JSON.stringify(consultimagereply);
         var jsonObjectconsultimagereply = JSON.parse(productvalueconsultimagereply);   

Consultreplys.find(function (err, consultreply) {
        // docs is an array
          for(var k = 0; k < consultreply.length; k++){
              vm.allconsultreplys[k] = consultreply[k];
          }
   
         var productvalueconsultreply = JSON.stringify(consultreply);
         var jsonObjectconsultreply = JSON.parse(productvalueconsultreply);
		 

      User.find(function (err, user) {
        // docs is an array
          for(var j = 0; j < user.length; j++){
              vm.allusers[j] = user[j];
          }
   
         var productvalueuser = JSON.stringify(user);
         var jsonObjectuser = JSON.parse(productvalueuser);

   
       Consult.find(function (err, consult) {
        // docs is an array
          // for(var a = 0; a < consult.length; a++){
          //     vm.allconsults[a] = consult[a];
          //   if(req.user.user_role == 'user'){

          //       if(req.user._id == consult[a].user_id){

          //             var totalreadstatusc = consult[a].read_status;

          //             //console.log(totalreadstatusc);

          //             if(totalreadstatusc != '1')
          //                {
          //               readstatuscount += 1;

                      
          //                }
          //           }


          //     }
          // }

           for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];
          consultproblemall[i] = Base64.decode(consult[i].problem);  
          consultproblemdetailall[i] = Base64.decode(consult[i].problemdetail);
         // console.log(consultproblemdetailall[i]);
          consultproblemareaall[i] = Base64.decode(consult[i].problemarea);        
            // console.log(consult[i].myimage);
         //  consultfinalimage[i] = consult[i].myimage.originalname;
          if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          

          }


          var finalstatusconsult = readstatuscount ;


           var totalconsultproblem = consultproblemall;
       var totalconsultproblemdetail = consultproblemdetailall;
       var totalconsultproblemarea = consultproblemareaall;
       var totalconsultimage = consultfinalimage;
   
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);
         var jsonObjectconsult =JSON.parse(productvalue);

   Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {
        // docs is an array
                //console.log(totalconsult.length);
     
        res.render('reply-consult.ejs', {data: jsonObject, datauser : jsonObjectuser , dataconsultreply : jsonObjectconsultreply ,  loadconsultdata : totalconsult , dataproduct : jsonObjectproduct , user : req.user , consultid : req.query.id , totalconsultproblems : totalconsultproblem , totalconsultproblemdetails : totalconsultproblemdetail , totalconsultproblemareas : totalconsultproblemarea, totalconsultimages : totalconsultimage, totalimagereply : jsonObjectconsultimagereply,totalreadconsultstatus : finalstatusconsult});

      });

    });    

  });

  });

  });

  });    
  
   }); 

   

    app.get('/review-consult', isLoggedIn, function(req, res , document) {
  //  var base64 = require('base-64');
  var Base64 = require('js-base64').Base64;

      var i = 0;
      var j = 0;
       var vm = this;
        vm.user = null;
        vm.allusers = [];
        vm.consult = null;
        vm.allconsults = [];
			vm.consultreply = null;
        vm.allconsultreplys = [];

      var Consult       = require('../app/models/consults');
            var User       = require('../app/models/user');
			 var Consultreplys       = require('../app/models/consultreply');

      var consultproblemall = [];
        var consultproblemdetailall = [];
         var consultproblemareaall = [];
         var consultfinalimage =[];


           User.find(function (err, user) {
        // docs is an array
          for(var j = 0; j < user.length; j++){
              vm.allusers[j] = user[j];
          }
   
         var productvalueuser = JSON.stringify(user);
         var jsonObjectuser = JSON.parse(productvalueuser);
		
		
Consultreplys.find(function (err, consultreply) {
        // docs is an array
          for(var k = 0; k < consultreply.length; k++){
              vm.allconsultreplys[k] = consultreply[k];
          }
   
         var productvalueconsultreply = JSON.stringify(consultreply);
         var jsonObjectconsultreply = JSON.parse(productvalueconsultreply);
		 

		 
   
       Consult.find().sort({"$natural": -1}).exec(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];
          consultproblemall[i] = Base64.decode(consult[i].problem);  
          consultproblemdetailall[i] = Base64.decode(consult[i].problemdetail);
         // console.log(consultproblemdetailall[i]);
          consultproblemareaall[i] = Base64.decode(consult[i].problemarea);        
            // console.log(consult[i].myimage);
           //consultfinalimage[i] = consult[i].myimage.originalname;

          }

       var totalconsultproblem = consultproblemall;
       var totalconsultproblemdetail = consultproblemdetailall;
       var totalconsultproblemarea = consultproblemareaall;
       var totalconsultimage = consultfinalimage;

   
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);
         //console.log(jsonObject.myimage);
         var jsonObjectconsult = JSON.parse(productvalue);

      Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('review-consult.ejs', {data: jsonObject, dataconsultreply :jsonObjectconsultreply , loadconsultdata : totalconsult , user : req.user , totalconsultproblems : totalconsultproblem , totalconsultproblemdetails : totalconsultproblemdetail , totalconsultproblemareas : totalconsultproblemarea, totalconsultimages : totalconsultimage, datauser: jsonObjectuser ,});

      });

     });

  });

   }); 

 });
   

	app.get('/list-orderitem', isLoggedIn, function(req, res) {
		//	console.log(req.query.order_id);
		var Order       = require('../app/models/orders');
		var Orderitem       = require('../app/models/orderitem');


	    var i = 0;
		var vm = this;
        vm.order = null;
        vm.allorders = [];
          var a = 0;
        vm.consult = null;
        vm.allconsults = [];
        var answerstatuscount = 0;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;


      var Consult       = require('../app/models/consults');
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
            if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          }
          var finalstatusconsult = readstatuscount ;
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);
       
   
        Order.find(function (err, order) {
  		// docs is an array
  		  for(var i = 0; i < order.length; i++){
            vm.allorders[i] = order[i];


        }
 
       var productvalues = JSON.stringify(order);
       var jsonObjects = JSON.parse(productvalues);

       var orderid = req.query.order_id;
         //   console.log(orderid);
       Orderitem.find({orderid : req.query.order_id}, function (err, orderitem) {
 
       var productvalue = JSON.stringify(orderitem);
        var jsonObject = JSON.parse(productvalue);

       console.log(jsonObject);

       // console.log(jsonObject.productname);

     Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

   
      res.render('list-orderitem.ejs', {data: jsonObject, datas: jsonObjects, loadconsultdata : totalconsult , user : req.user , orderid : req.query.order_id , totalreadconsultstatus : finalstatusconsult,});

      });

      });


         });

         }); 

     });
		
	app.get('/res-herbal', function(req, res) {
		res.render('res-herbal.ejs', {
		});
	});

    app.get('/forget', function(req, res) {
    res.render('forget-password.ejs', {
    });
  });

     app.get('/forget-password', function(req, res) {
    res.render('forget-password.ejs', {
    });
  });

  app.get('/forget_resetpassword', function(req, res) {
  
   var User       = require('../app/models/user');
      var md5 = require('md5');

    
    var username= req.query.email;
    console.log(username);
    var usertoken= req.query.token;
    console.log(usertoken);

 app.post('/forget_resetpassword', function (req, res , done) {
    //console.log(res);
     var ids={};

    var npassword= req.body.npassword;
    var cpassword= req.body.cpassword;
    //console.log(username);

      User.findOne({'local.email': username},function(err,user){
  
         //  console.log(user);
          var _id = user._id;
         //  console.log(_id);

           if(user.token == usertoken){

            console.log("yes it is true");

                 if(npassword === cpassword){


            console.log("Password Match!!!");




              var set = {
                'local.password' : md5(npassword, 10),
                token : "",

                   };
             console.log(set);

           User.update(
            { _id: _id },
            { $set: set },
            function (err, doc) {

               console.log(doc);
            });

               } else {

                 console.log("Password not Match!!!");

                return done(null, false, req.flash('forgetMessage', 'Password not match.'));


               }

           }else {

            console.log("token not match");
           }
          

          
        });

       return res.redirect('/');    

});


 
    res.render('forget_resetpassword.ejs', {
    });
  });


app.get('/delete-consult-one',isLoggedIn, function(req, res) {
     var Consult       = require('../app/models/consults');
    //  var base64 = require('base-64');
    var Base64 = require('js-base64').Base64;


      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

      var Consult       = require('../app/models/consults');
      var consultproblemall = [];
        var consultproblemdetailall = [];
         var consultproblemareaall = [];
         var consultfinalimage =[];
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

          consultproblemall[i] = Base64.decode(consult[i].problem);  
          consultproblemdetailall[i] = Base64.decode(consult[i].problemdetail);
          consultproblemareaall[i] = Base64.decode(consult[i].problemarea);        
           consultfinalimage[i] = consult[i].myimage.originalname;

          }

       var totalconsultproblem = consultproblemall;
       var totalconsultproblemdetail = consultproblemdetailall;
       var totalconsultproblemarea = consultproblemareaall;
       var totalconsultimage = consultfinalimage;

   
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);
         //console.log(jsonObject.myimage);
         var jsonObjectconsult = JSON.parse(productvalue);

         Consult.remove({_id : req.query.consultid}, function (err, consults) {
          
              console.log(consults);

             return res.redirect('consult');  

         });

     
       // res.render('review-consult.ejs', {data: jsonObject, loadconsultdata : jsonObjectconsult, user : req.user , totalconsultproblems : totalconsultproblem , totalconsultproblemdetails : totalconsultproblemdetail , totalconsultproblemareas : totalconsultproblemarea, totalconsultimages : totalconsultimage,});

      });
       
  });



	app.get('/delete-consult',isLoggedIn, function(req, res) {
	   var Consult       = require('../app/models/consults');
    //  var base64 = require('base-64');
    var Base64 = require('js-base64').Base64;


      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

      var Consult       = require('../app/models/consults');
      var consultproblemall = [];
        var consultproblemdetailall = [];
         var consultproblemareaall = [];
         var consultfinalimage =[];
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

          consultproblemall[i] = Base64.decode(consult[i].problem);  
          consultproblemdetailall[i] = Base64.decode(consult[i].problemdetail);
          consultproblemareaall[i] = Base64.decode(consult[i].problemarea);        
           consultfinalimage[i] = consult[i].myimage.originalname;

          }

       var totalconsultproblem = consultproblemall;
       var totalconsultproblemdetail = consultproblemdetailall;
       var totalconsultproblemarea = consultproblemareaall;
       var totalconsultimage = consultfinalimage;

   
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);
         //console.log(jsonObject.myimage);
         var jsonObjectconsult = JSON.parse(productvalue);

         Consult.remove({_id : req.query.consultid}, function (err, consults) {
          
              console.log(consults);

             return res.redirect('review-consult');  

         });

     
       // res.render('review-consult.ejs', {data: jsonObject, loadconsultdata : jsonObjectconsult, user : req.user , totalconsultproblems : totalconsultproblem , totalconsultproblemdetails : totalconsultproblemdetail , totalconsultproblemareas : totalconsultproblemarea, totalconsultimages : totalconsultimage,});

      });
       
	});





  app.post('/forget', function(req, res) {
   
    var User       = require('../app/models/user');

       var ids={};

      var username= req.body.username;
   
     User.findOne({ $or: [{'google.email': req.body.username},{'facebook.email': req.body.username}]}, function(err, existingUser) {
      
      if(existingUser){

         return res.render('forget-password', { errorforget: 'User Registered as a google account or facebook account' });


      }else{

        User.find({'local.email': req.body.username},function(err,user){      

       if(user == ""){

      
         return res.render('forget-password', { errorforget: 'User Not Registered' });
         
      }
      else
      {


    var token = Math.random();
    console.log(token);
  
     User.findOne({'local.email': req.body.username},function(err,user){
  
          var _id = user._id;
           console.log(_id);
          
              var set = {
                token : token,
            
            };

           User.update(
            { _id: _id },
            { $set: set },
            function (err, doc) {

                console.log(doc);
            });         
        });
    
            var aws = require('aws-sdk');
            aws.config.loadFromPath('newconfig.json');
            var ses = new aws.SES({apiVersion: '2010-12-01'});
                var to = [req.body.username]
                var from = 'health@greenliving.io'

                ses.sendEmail( 
                  { 
                    Source: from, 
                    Destination: { ToAddresses: to },
                    Message: {
                      Subject: {
                        Data: 'Forget Password Mail'
                      },
                      Body: {
                        Html: {
                        Data: "<b>"+ "<p>Thanks..We appericiate you..</p><p>Update Your Password to below Link - <p> <a href='https://greenliving.io/forget_resetpassword?email="+req.body.username+"&token="+token+"'>Click Here</a>" +"</b>" // html body',
                        }
                      }
                    }
                  }
                , function(err, data) {
                  if(err) throw err
                  console.log('Email sent:');
                  console.log(data);
                });



     // req.session.successforget = 'Please check your email and follow instructions';  
     //  return res.redirect('/');    
        return res.render('forget-password', { successforget: 'Please check your email and follow instructions' });

              }
                 
        });


      }

     });

  });





   app.post('/registerinsert', function(req, res) {
      //console.log(req.body.regsitertoken);
          var User       = require('../app/models/user'); 
             var md5 = require('md5');
             var tokens = Math.random();

          var stringkk = req.body.email;

     // var format = /[+\-\/?]+/;

     //  if(format.test(stringkk)){
     //         console.log('hi');
     //    req.flash('locals.errorregister', 'Please enter email without + sign');
     //    return res.redirect('/wrongsignup');  

     // } else {
            
       if(req.body.password === req.body.cpassword){

         User.findOne({ $or: [{'local.email': req.body.email},{'google.email': req.body.email},{'facebook.email': req.body.email}]}, function(err, existingUser) {
                    
             
           if(!existingUser){

                  // var bcrypt = require('bcrypt-nodejs');
                  var hash = md5(req.body.password);                 
                  // var regsitertoken = token;
                 // console.log(hash);
                //   var setencode = {  
                //        user_role: req.body.user_role,
                //        firstName : req.body.firstName ,
                //        // lastName : req.body.lastName,
                //        local: {
                //          email : req.body.email,
                //          password : hash, 
                //        },
                //        img : {
                //        originalname : "usericon.jpg"
                //        },
                //        first_time_login : req.body.first_time_login   
                       
                // };  

                // console.log(setencode);
              var User  = require('../app/models/user');
              // var users = new User(setencode);
              //  users.save(function(error, dataconsult){
              //   console.log(dataconsult._id);
                  
              //        // res.json(data);
              //       //console.log(dataconsult.local.email); 
                       
              //     });


                    // var tokens = token;
                    // console.log(token);


                    var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                        var to = [req.body.email]
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
                                Data: "<b>"+ "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><p>Dear "+ req.body.firstName +",</p><p>Thank you for signing up to GreenLiving.</p><p>GreenLiving offers the following services:</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>Consultation</th><td>FREE</td></tr><tr><th scope='col' style='text-align: left;'>Herbal Supplement : </th><td>minimum 1 dosage (5 doses) US$ 13.99/dosage + FREE shipping(via USPS First Class Mail)</td></tr><tr><th scope='col' style='text-align: left;'>Laser Therapy : </th><td>US$ 4.99/treatment via mobile app</td></tr></table></div><p>If you have any questions or you need further assistance, please feel free to contact us at</p><p>GreenLiving.xxx</p><p>Thanks,</p><p>GreenLiving.team</p><p>For Login to below Link - <p> <a href='https://greenliving.io/verification_email?email="+req.body.email+"&token="+req.body.regsitertoken+"'>Click Here</a></p><p>IMPORTANT: If you have a medical emergency, please call 911 or go to your nearest hospital for help.</p>" +"</b>" // html body',
                                }
                              }
                            }
                          }).promise();

                        
// var awsSesMail = require('aws-ses-mail');
// var sesMail = new awsSesMail();
// var sesConfig = {
//  "accessKeyId": "AKIAICW4HYFCNTRMNRIQ",
//  "secretAccessKey": "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", 
//  "region": "us-east-1" 
// };
// sesMail.setConfig(sesConfig);
 
// var options = {
//   from: 'jain.akash@novasoftcorps.com',
//   to: [req.body.email],
//   subject: 'Hello world',
//   content: '<html><head></head><body><div><p>Hello world!</p></div></body></html>'
// };
 
// sesMail.sendEmail(options, function(data) {
//   // TODO sth....
//   console.log(data);
// });

//                     var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'diksha.novasoftcorps@gmail.com',
//     pass: 'smile111'
//   }
// });

// var mailOptions = {
//   from: 'diksha.novasoftcorps@gmail.com',
//   to: [req.body.email],
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });



     req.flash('locals.successregister', 'Please check your email and follow instructions');
     return res.redirect('/wrongsignup');  

               } else {


     req.flash('locals.errorregister', 'Already Registered');
      return res.redirect('/wrongsignup');             
               }


           });   

       }  else {

         req.flash('locals.errorregister', 'Password not match !!');
      return res.redirect('/wrongsignup');             

       } 
     // }
    });  






   app.post('/processSubmit', function(req, res) {
      // console.log(req.body.token);
      var dates =  new Date();
     var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

          var User       = require('../app/models/user');
          var Hpdetail       = require('../app/models/hpdetail'); 
           var setencode = {  
                       userid: req.body.userid,
                       fullname : req.body.fullname ,
                       gender : req.body.gender,
                       shipaddress : req.body.shipaddress,
                       country : req.body.country,                    
                       administrative_area_level_1 : req.body.administrative_area_level_1,   
                       locality: req.body.locality,
                       postal_code : req.body.postal_code ,
                       mobile : req.body.mobile,
                       ofcphone : req.body.ofcphone,
                       email : req.body.email, 
                       licenseId: req.body.licenseId,
                       issueDate : req.body.issueDate ,
                       expDate : req.body.expDate,
                       whereHear : req.body.whereHear,
                       interested : req.body.interested,
                       datetime : strDate
                };  

                 // console.log(setencode);
                var hpdetail = new Hpdetail(setencode);
               hpdetail.save(function(error, dataconsult){
                  console.log(dataconsult._id);                  
                       
                  });

                    var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                        var to = [req.body.email]
                        var from = 'health@greenliving.io'
                        // console.log(to);
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
                                Data: "<b>"+ "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><p>Dear "+ req.body.fullname +",</p><p>Congratulation! Your application has been approved. You can log in your account to view products and enjoy your discount.</p><p>Looking forward to working with you soon</p><p>Sincerely yours,</p><p>GreenLiving Admin Team</p><p>For verify your account Login to below Link - <p> <a href='https://greenliving.io/verification_email?email="+req.body.email+"&token="+req.body.token+"'>Click Here</a></p><p>IMPORTANT: If you have a medical emergency, please call 911 or go to your nearest hospital for help.</p>" +"</b>" // html body',                                }
                              }
                            }
                          }
                          }).promise();

     req.flash('locals.successregister', 'Please check your email and follow instructions');
     return res.redirect('/wrongsignup');  



      
    });  


  
   

 app.get('/verification_email', function (req, res , done) {
   // console.log(res);
  var User       = require('../app/models/user');

    var str = req.query.email;
    var username = str.split(' ').join('+');
    // var username= req.query.email;
    console.log(username);
    var usertoken= req.query.token;
    console.log(usertoken);
    //console.log(res);
     var ids={};


      User.findOne({'local.email': username},function(err,user){
  
          console.log(user);
          var _id = user._id;
          // console.log(_id);

           if(user.regsitertoken == usertoken){

            console.log("yes it is true");

              var set = {
                regsitertoken : "",
                   };
             // console.log(set);

           User.update(
            { _id: _id },
            { $set: set },
            function (err, doc) {

               // console.log(doc);
            });

           return res.redirect('/home');         

           }else {

            console.log("token not match");
           }
          
          return res.redirect('/');    
          
        });

  

});


   app.post('/registergoogle', function(req, res) {
    //console.log("hiii");
      //console.log(req.body.email);
          var User       = require('../app/models/user'); 

         User.findOne({ $or: [{'local.email': req.body.email},{'google.email': req.body.email},{'facebook.email': req.body.email}]}, function(err, existingUser) {
             
           if(existingUser){

        
              //  res.send({ status : 200 , existingUser}); 

               res.status(200).json({ status :200, existingUser});


               } else {

               // res.send({ status : 500 , err : 'Sorry , User not registered..Please consult the website !!!'});  

                res.status(500).json({ status :500, error: "Sorry , User not registered..Please consult the website !!!"});

               }
          });   
    });  




	app.post('/symptom_insert',isLoggedIn, function(req, res) {
	   var Symptom       = require('../app/models/symptoms');
	   var User       = require('../app/models/user');


	   var userid =  req.body.userid;
	   console.log(userid);
     var email =  req.body.email;

	   var sets = {    
		              userid : req.body.userid,
                  fname : req.body.fname,
                  lname:req.body.lname,
                  age:req.body.age,
                  gender : req.body.gender,
                  complain :req.body.complain,
                  currentMedication : req.body.currentMedication,
                  history:req.body.history,
                  pain : req.body.pain,
                  complainTreatment : req.body.complainTreatment,
                  injury : req.body.injury,
                  locationPain : req.body.locationPain,
                  lastMedical : req.body.lastMedical,
                  lastPeriod : req.body.lastPeriod,
                  menopause : req.body.menopause,
                  pregnancyMonth : req.body.pregnancyMonth,
                  addinfo : req.body.addinfo,
		             // temperatures:req.body.temperatures,
		              // stoolcolor:req.body.stoolcolor,
		                // sleep : req.body.sleep,
		                // exercise :req.body.exercise,
		                // general_energy_level : req.body.general_energy_level,
		                // energy_level_after_eating : req.body.energy_level_after_eating,
		                // Appetite : req.body.Appetite,
		                // Crave_Taste : req.body.Crave_Taste,
		                // Avoid_Taste :req.body.Avoid_Taste,
		                // Digestion :req.body.Digestion,
		                // Stools :req.body.Stools,
		                // What_color_are_your_stool :req.body.What_color_are_your_stool,
		                // Number_of_daily_bowel_movements :req.body.Number_of_daily_bowel_movements,
		                // Urine :req.body.Urine,
		                // What_color_is_your_urine :req.body.What_color_is_your_urine,
		                // How_often_do_you_urinate_in_a_day :req.body.How_often_do_you_urinate_in_a_day,
		                // ReproductionMen :req.body.ReproductionMen,
		                // Have_a_genital_discharge_What_color :req.body.Have_a_genital_discharge_What_color,
		                // How_often_do_you_engage_in_sex :req.body.How_often_do_you_engage_in_sex,
		                // ReproductionWomen :req.body.ReproductionWomen,
		                // Clots :req.body.Clots,
		                // How_long_is_your_menstrual_cycle_days:req.body.How_long_is_your_menstrual_cycle_days,
		                // Is_it_regular:req.body.Is_it_regular,
		                // How_long_is_your_menstrual_flow:req.body.How_long_is_your_menstrual_flow,
		                // What_color_is_your_menstrual_flow:req.body.What_color_is_your_menstrual_flow,
		                // Do_You_use_birth_control_pills_How_long:req.body.Do_You_use_birth_control_pills_How_long,
		                // How_many_pregnancies_have_you_had:req.body.How_many_pregnancies_have_you_had,
		                // How_many_children_have_you_borne:req.body.How_many_children_have_you_borne,
		                // How_many_miscarriages:req.body.How_many_miscarriages,
		                // How_many_abortions:req.body.How_many_abortions,
		                // Respiration:req.body.Respiration,
		                // cough:req.body.cough,
		                // Pain:req.body.Pain,
		                // Headaches:req.body.Headaches,
		                // Eyes:req.body.Eyes,
		                // noise_in_ears:req.body.noise_in_ears,
		                // Ears:req.body.Ears,
		                // Mouth:req.body.Mouth,
		                // Teeth:req.body.Teeth,
		                // Throat:req.body.Throat,
		                // Nose:req.body.Nose,
		                // Muscles:req.body.Muscles,
		                // Muscle_weakness_Where:req.body.Muscle_weakness_Where,
		                // Muscle_tension_Where:req.body.Muscle_tension_Where,
		                // Emotional_Mental_Thinking:req.body.Emotional_Mental_Thinking,
		                // emotions_predominant:req.body.emotions_predominant,
		                // Miscellaneous:req.body.Miscellaneous,
		                // feeling_of_heaviness:req.body.feeling_of_heaviness

		        
            };


				var symptoms = new Symptom(sets);
				symptoms.save(function(error, datas){
			    if(error){
			        res.json(error);
			    }
			    else{
			    	console.log(datas);

			    	//res.json(datas);
				    var _id = req.body.userid;
	               
	          var set = {consult_status:"1",first_time_login:"False"};

			       User.update(
		            { _id: _id },
		            { $set: set },
		            function (err, doc) {
		              
		                 console.log(doc);
		            });

                    // var aws = require('aws-sdk');
                    // aws.config.loadFromPath('newconfig.json');
                    // var ses = new aws.SES({apiVersion: '2010-12-01'});
                    //     var to = [req.body.email]
                    //     var from = 'jain.akash@novasoftcorps.com'
                    //     // console.log(to);
                    //     ses.sendEmail( 
                    //       { 
                    //         Source: from, 
                    //         Destination: { ToAddresses: to },
                    //         Message: {
                    //           Subject: {
                    //             Data: 'GREENLIVING'
                    //           },
                    //           Body: {
                    //             Html: {
                    //             Data: "<b>"+ "<p>Hi "+ req.body.firstName +" </p><p>Thank you for filling in this questionnaire. This process may be difficult and redundant. But they are very useful information for us to offer excellent personal health service. To assure you, all information you provided to us is strictly confidential and will be kept in our record according to HIPPA.</p><p>To help us get started, please go to ‘Consult now’ in GreenLiving and fill in further specific information regarding your current health issue and we can start from there.</p><p>Looking forward to working with you soon.</p><p>Sincerely yours,</p><p>Licensed Acupuncturists Team</p><p>Traditional Chinese Medicine</p>"+"</b>" // html body',

                    //             }
                    //           }
                    //         }
                    //       }).promise();


			     }
 
                return res.redirect('homes');


			    });     

       
     
	});


app.post('/symptomApi', function(req, res) {
     var Symptom       = require('../app/models/symptoms');
     var User       = require('../app/models/user');


     var userid =  req.body.userid;
     console.log(userid);

     var sets = {    
                  userid : req.body.userid,
                  fname : req.body.fname,
                  lname:req.body.lname,
                  age:req.body.age,
                  gender : req.body.gender,
                  complain :req.body.complain,
                  currentMedication : req.body.currentMedication,
                  history:req.body.history,
                  pain : req.body.pain,
                  complainTreatment : req.body.complainTreatment,
                  injury : req.body.injury,
                  locationPain : req.body.locationPain,
                  lastMedical : req.body.lastMedical,
                  lastPeriod : req.body.lastPeriod,
                  menopause : req.body.menopause,
                  pregnancyMonth : req.body.pregnancyMonth
                 // temperatures:req.body.temperatures,
                  // stoolcolor:req.body.stoolcolor,
                    // sleep : req.body.sleep,
                    // exercise :req.body.exercise,
                    // general_energy_level : req.body.general_energy_level,
                    // energy_level_after_eating : req.body.energy_level_after_eating,
                    // Appetite : req.body.Appetite,
                    // Crave_Taste : req.body.Crave_Taste,
                    // Avoid_Taste :req.body.Avoid_Taste,
                    // Digestion :req.body.Digestion,
                    // Stools :req.body.Stools,
                    // What_color_are_your_stool :req.body.What_color_are_your_stool,
                    // Number_of_daily_bowel_movements :req.body.Number_of_daily_bowel_movements,
                    // Urine :req.body.Urine,
                    // What_color_is_your_urine :req.body.What_color_is_your_urine,
                    // How_often_do_you_urinate_in_a_day :req.body.How_often_do_you_urinate_in_a_day,
                    // ReproductionMen :req.body.ReproductionMen,
                    // Have_a_genital_discharge_What_color :req.body.Have_a_genital_discharge_What_color,
                    // How_often_do_you_engage_in_sex :req.body.How_often_do_you_engage_in_sex,
                    // ReproductionWomen :req.body.ReproductionWomen,
                    // Clots :req.body.Clots,
                    // How_long_is_your_menstrual_cycle_days:req.body.How_long_is_your_menstrual_cycle_days,
                    // Is_it_regular:req.body.Is_it_regular,
                    // How_long_is_your_menstrual_flow:req.body.How_long_is_your_menstrual_flow,
                    // What_color_is_your_menstrual_flow:req.body.What_color_is_your_menstrual_flow,
                    // Do_You_use_birth_control_pills_How_long:req.body.Do_You_use_birth_control_pills_How_long,
                    // How_many_pregnancies_have_you_had:req.body.How_many_pregnancies_have_you_had,
                    // How_many_children_have_you_borne:req.body.How_many_children_have_you_borne,
                    // How_many_miscarriages:req.body.How_many_miscarriages,
                    // How_many_abortions:req.body.How_many_abortions,
                    // Respiration:req.body.Respiration,
                    // cough:req.body.cough,
                    // Pain:req.body.Pain,
                    // Headaches:req.body.Headaches,
                    // Eyes:req.body.Eyes,
                    // noise_in_ears:req.body.noise_in_ears,
                    // Ears:req.body.Ears,
                    // Mouth:req.body.Mouth,
                    // Teeth:req.body.Teeth,
                    // Throat:req.body.Throat,
                    // Nose:req.body.Nose,
                    // Muscles:req.body.Muscles,
                    // Muscle_weakness_Where:req.body.Muscle_weakness_Where,
                    // Muscle_tension_Where:req.body.Muscle_tension_Where,
                    // Emotional_Mental_Thinking:req.body.Emotional_Mental_Thinking,
                    // emotions_predominant:req.body.emotions_predominant,
                    // Miscellaneous:req.body.Miscellaneous,
                    // feeling_of_heaviness:req.body.feeling_of_heaviness

            
            };


        var symptoms = new Symptom(sets);
        symptoms.save(function(error, datas){
          if(error){
              res.json(error);
          }
          else{
            //console.log(datas);

               res.json(datas);

            var _id = req.body.userid;
                 
            var set = {consult_status:"1"};

             User.update(
                { _id: _id },
                { $set: set },
                function (err, doc) {
                  
                     console.log(doc);
                });


           }
 
    //return res.redirect('consult-onlines');


          });     

       
     
  });



  app.post('/reply-consult-insert',isLoggedIn, function(req, res) {
   // console.log(req.body);
     var Consult       = require('../app/models/consults');
     var Product       = require('../app/models/products');
     var User       = require('../app/models/user');
     var Consultreplys       = require('../app/models/consultreply');
     var dates =  new Date();
     var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

    // var base64 = require('base-64');
    var Base64 = require('js-base64').Base64;

     var consultid =  req.body.consult_id;

     var freq =  req.body.frequency1;
     var freqs ;
   // console.log(newcomment);
    for(var s = 0; s < freq.length; s++){
        
        // console.log("dataa" + freq[s]);

        if(freq[s] == "undefined" ){

          freqs += freq[s];

        } else {

          freqs += '@' + freq[s];
        }
           

    }

    // console.log("two data" + freqs);
    var d=freqs.slice(10);

     var email = req.body.email;
     var firstName = req.user.firstName;

     var imagepath = {};
     imagepath['originalname'] = req.body.frontoriginalname;
     imagepath['path'] = req.body.frontoriginalpath;

     var nimagepath = {};
     nimagepath['originalname'] = req.body.backoriginalname;
     nimagepath['path'] = req.body.backoriginalpath;

    var newcomment = req.body.comment;
    var finalcomment ;
   // console.log(newcomment);
    for(var l = 0; l < newcomment.length; l++){
        
        // console.log(newcomment[l]);

        if(newcomment[l] == "undefined" ){

          finalcomment += newcomment[l];

        } else {

          finalcomment += '@' + newcomment[l];
        }


         // finalcomment += newcomment[l] + '@' + newcomment[l];
           

    }

     var newprodid = req.body.product_id;
     var finalproid ;
 
     for(var j = 0; j < newprodid.length; j++){
        
         // console.log(newprodid[j]);    

         finalproid += newprodid[j];     

    }
 
    var n=finalcomment.slice(10);

    var b=finalproid.slice(9);

    console.log(b);

     var setd = {
             product_id: b,
             consult_id: req.body.consult_id,
             consult_status: "Answered",
             backimg : nimagepath,
             img : imagepath,
             query : "",
             notifydate : "",
            // comment: Base64.encode(req.body.comment),
             comment: n,
             frequency1 : d,
             frequency2 : req.body.frequency2,
             doctorcomment : req.body.doctorcomment,             
             datetime: strDate
             
          };

        
          //console.log(setd);


        var consultreply = new Consultreplys(setd);

        consultreply.save(function(error, datas){

          if(error){
               // res.json(error);

               console.log(error);
          }
          else{
           // console.log(datas);

          var fproduct_id = [];
          var str = datas.product_id;
          var str_array = str.split(',');
          for(var t = 0; t < str_array.length; t++) {
           // Trim the excess whitespace.
           fproduct_id = str_array[t].replace(/^\s*/, "").replace(/\s*$/, "");
          }

          var ffrequency1 = [];
          var strfrequency1 = datas.frequency1;
           var str_arrayfrequency1 = strfrequency1.split('@');
          for(var t = 0; t < str_arrayfrequency1.length; t++) {
           // Trim the excess whitespace.
           ffrequency1 = str_arrayfrequency1[t].replace(/^\s*/, "").replace(/\s*$/, "");
          }

           // console.log("productid is" + fproduct_id);
           // console.log("frequenccy is" + ffrequency1);

            //res.json(datas);
            var _id = req.body.consult_id;
                 
            var setss = {consult_status:"Answered",view_consult_status: "1"};

             Consult.update(
                { _id: req.body.consult_id },
                { $set: setss },
                function (err, doc) {
                  
                    // console.log(doc);

                   //  console.log(req.body.user_id);

            User.findById({_id:req.body.user_id}, function (err, user) {
              
              //    console.log(user);   

                   });  

             // console.log(req.body.product_id);

            Product.find({_id:req.body.product_id}, function (err, product) {
              
               // console.log(product);

                // console.log(product[0].productname);   

                // console.log(product.productname); 

                for(var h = 0; h < product.length; h++) {

                   console.log(product[h].productname);   

                }      

           //  var ktdata = "<b>"+ "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><p>Dear "+ firstName +",</p><p>Thank you for giving us a chance to work with you.The following are the finding and suggestions for this consultation:</p><p>Findings to your present illness :</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>" + ffrequency1 + "</th></tr></table></div><p>Suggested herbal supplements :</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>" + for(var h = 0; h < product.length; h++) { product[h].productname } + "</th></tr></table></div><p>Please feel free to contact us if you have any questions.</p><p>Sincerely yours,</p><p>Licensed Acupuncturists Team</p><p>Traditional Chinese Medicine</p>" +"</b>" // html body',
           //  console.log(ktdata);
           // 
            var tdata = "<b>"+ "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><p>Dear "+ firstName +",</p><p>Thank you for giving us a chance to work with you.The following are the finding and suggestions for this consultation:</p><p>Findings to your present illness :</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>" + ffrequency1 + "</th></tr></table></div><p>Suggested herbal supplements :</p><div class='row'><table class='table'><tr><th scope='col' style='text-align: left;'>"
            
             // var tdata1 = tdata + for(var h = 0; h < product.length; h++) { product[h].productname }; 

             

            var tdata2 =  "</th></tr></table></div><p>Please feel free to contact us if you have any questions.</p><p>Sincerely yours,</p><p>Licensed Acupuncturists Team</p><p>Traditional Chinese Medicine</p>" +"</b>" // html body',

            var uitaghtml = '<ul>';
  for (var z = 0; z < product.length; z++) {
    uitaghtml = uitaghtml + '<li>' + product[z].productname + '</li>';
  }
  uitaghtml = uitaghtml + '</ul>';

            var finaltd = tdata + uitaghtml + tdata2;

            console.log(finaltd);


            var aws = require('aws-sdk');
            aws.config.loadFromPath('newconfig.json');
            var ses = new aws.SES({apiVersion: '2010-12-01'});
                var to = [email]
                var from = 'health@greenliving.io'
              //   console.log(to);  
                ses.sendEmail( 
                  { 
                    Source: from, 
                    Destination: { ToAddresses: to },
                    Message: {
                      Subject: {
                        Data: 'Consult Problem'
                      },
                      Body: {
                        Html: {
                        Data: finaltd}
                      }
                    }
                  }
                , function(err, data) {
                  if(err) throw err
                  console.log('Email sent:');
                //  console.log(data);
                });    


                });

               });  


           }


          });     

       
    return res.redirect('review-consult');
     
});

	app.get('/symptom-user', isLoggedIn, function(req, res) {
      
		var Symptom       = require('../app/models/symptoms');
    var Consult       = require('../app/models/consults');
    var readstatuscount = 0; 
    var answerstatuscount = 0;  
    var totalreadconsultstatus = 0 ;
    var i = 0;
		var vm = this;
        vm.symptoms = null;
        vm.allsymptoms = [];
        vm.consult = null;
        vm.allconsults = [];

       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

      //console.log(readstatuscount);       
      var finalstatusconsult = readstatuscount ;
      //console.log(finalstatusconsult);

      Symptom.find(function (err, symptoms) {
  		// docs is an array
  		  for(var i = 0; i < symptoms.length; i++){
            vm.allsymptoms[i] = symptoms[i];
       }
       var productvalue = JSON.stringify(symptoms);
        var jsonObject = JSON.parse(productvalue);

       console.log(jsonObject);

   
      res.render('symptom-user.ejs', {data: jsonObject, user : req.user , totalreadconsultstatus : finalstatusconsult,});

      });


	});

  });       

	app.get('/symptom-admin', isLoggedIn, function(req, res) {
		var Symptom       = require('../app/models/symptoms');
		var User       = require('../app/models/user');

         var i = 0;
		var vm = this;
		vm.users = null;
        vm.allusers = [];
        vm.symptoms = null;
        vm.allsymptoms = [];


		User.find(function (err, users) {
  		// docs is an array
  		  for(var i = 0; i < users.length; i++){
            vm.allusers[i] = users[i];
       }
       var productvalueusers = JSON.stringify(users);
        var jsonObjectusers = JSON.parse(productvalueusers);

       console.log(jsonObjectusers);

      Symptom.find().sort({"fname": -1}).exec(function(err, symptoms) {
  		// docs is an array
  		  for(var i = 0; i < symptoms.length; i++){
            vm.allsymptoms[i] = symptoms[i];
       }
       var productvalue = JSON.stringify(symptoms);
        var jsonObject = JSON.parse(productvalue);

      // console.log(jsonObject);

   
      res.render('symptom-admin.ejs', {data: jsonObject, datauser: jsonObjectusers, user : req.user});

      });


	});

});	

  app.get('/symptom-all', isLoggedIn, function(req, res) {
    var Symptom       = require('../app/models/symptoms');
    var User       = require('../app/models/user');
       var i = 0;
   var vm = this;
        vm.order = null;
        vm.allorders = [];
       
        vm.users = null;
        vm.allusers = [];
        vm.symptoms = null;
        vm.allsymptoms = [];
         var a = 0;
        vm.consult = null;
        vm.allconsults = [];


      var Consult       = require('../app/models/consults');
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
          }
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);
   

    

    User.find(function (err, users) {
      // docs is an array
        for(var i = 0; i < users.length; i++){
            vm.allusers[i] = users[i];
       }
       var productvalueusers = JSON.stringify(users);
        var jsonObjectusers = JSON.parse(productvalueusers);

       console.log(jsonObjectusers);

      Symptom.find(function (err, symptoms) {
      // docs is an array
        for(var i = 0; i < symptoms.length; i++){
            vm.allsymptoms[i] = symptoms[i];
       }
       var productvalue = JSON.stringify(symptoms);
        var jsonObject = JSON.parse(productvalue);

      // console.log(jsonObject);

    Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {


   
      res.render('symptom-all.ejs', {data: jsonObject, datauser: jsonObjectusers, loadconsultdata: totalconsult, user : req.user});

      });

   });


  });

   });  

   });       

	app.get('/symptom-detail', isLoggedIn, function(req, res) {
		var Symptom       = require('../app/models/symptoms');
		var User       = require('../app/models/user');

         var i = 0;
		var vm = this;
		vm.users = null;
        vm.allusers = [];
        vm.symptoms = null;
        vm.allsymptoms = [];
          var a = 0;
        vm.consult = null;
        vm.allconsults = [];

        var currentuserid = req.query.userid;
        console.log(currentuserid);


      var Consult       = require('../app/models/consults');
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
          }
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);
   


		User.find(function (err, users) {
  		// docs is an array
  		  for(var i = 0; i < users.length; i++){
            vm.allusers[i] = users[i];
       }
       var productvalueusers = JSON.stringify(users);
        var jsonObjectusers = JSON.parse(productvalueusers);

       console.log(jsonObjectusers);

      Symptom.find(function (err, symptoms) {
  		// docs is an array
  		  for(var i = 0; i < symptoms.length; i++){
            vm.allsymptoms[i] = symptoms[i];
       }
       var productvalue = JSON.stringify(symptoms);
        var jsonObject = JSON.parse(productvalue);

      // console.log(jsonObject);
       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

   
      res.render('symptom-detail.ejs', {data: jsonObject, datauser: jsonObjectusers, loadconsultdata:totalconsult , currentuserid : req.query.userid, user : req.user});

      });

      });


	});

	 });

     });

	app.get('/product-list', isLoggedIn, function(req, res) {
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');

         var i = 0;
		var vm = this;
		vm.users = null;
        vm.allusers = [];
        vm.products = null;
        vm.allproducts = [];


		User.find(function (err, users) {
  		// docs is an array
  		  for(var i = 0; i < users.length; i++){
            vm.allusers[i] = users[i];
       }
       var productvalueusers = JSON.stringify(users);
        var jsonObjectusers = JSON.parse(productvalueusers);

       // console.log(jsonObjectusers);

      Product.find(function (err, products) {
  		// docs is an array
  		  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
       var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);

      // console.log(jsonObject);

   
      res.render('product-list.ejs', {data: jsonObject, datauser: jsonObjectusers, user : req.user});

      });


	});

 });

	app.get('/edit-product', isLoggedIn, function(req, res) {
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');

         var i = 0;
		var vm = this;
		vm.users = null;
        vm.allusers = [];
        vm.products = null;
        vm.allproducts = [];

        var productid = req.query.id;


		User.find(function (err, users) {
  		// docs is an array
  		  for(var i = 0; i < users.length; i++){
            vm.allusers[i] = users[i];
       }
       var productvalueusers = JSON.stringify(users);
        var jsonObjectusers = JSON.parse(productvalueusers);

      // console.log(jsonObjectusers);

      Product.find(function (err, products) {
  		// docs is an array
  		  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
       var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);

      // console.log(jsonObject);

   
      res.render('edit-product.ejs', {data: jsonObject, datauser: jsonObjectusers, user : req.user, productid : req.query.id});

      });


	});

	 });


   

	app.get('/deleteproduct',isLoggedIn, function(req, res) {
	   var Product       = require('../app/models/products');
       Product.remove({_id : req.query.productid}, function (err, products) {
         console.log(products);    
      });

     return res.redirect('product-list');

	});

  app.post('/notification-query-update', isLoggedIn, function(req, res) {
     console.log(req.body.query);
     var dates=  new Date();
    var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

    var Consultreplys = require('../app/models/consultreply');
    var Consult       = require('../app/models/consults');
   // var base64 = require('base-64');
    var Base64 = require('js-base64').Base64;
      Consultreplys.find({_id : req.body.consultreply_id}, function (err, consultreplys) {

        // console.log(consultreplys);

       console.log(consultreplys[0]);

        var newpara = req.body.query;
        var newpainEval = req.body.painEvaluation;
        var newdate = strDate;



        if(consultreplys[0].query == ""){

           newpara = req.body.query;
           newpainEval = req.body.painEvaluation;
           newdate = strDate;
            var set = {query : newpara , painEvaluation : newpainEval, notifydate : newdate };
    var _id = req.body.consultreply_id;

    // console.log(_id);
    console.log(set);
    Consultreplys.update(
         { _id: _id },
         { $set: set },
         function (err, docs) {

           // console.log(docs);

                var set = {read_status: "1"};

                var _id= req.body.current_id;

                Consult.update(
                            { _id: _id },
                            { $set: set },
                            function (err, doc) {

                              // console.log(doc);

                            });

                           // console.log(docs);

      return res.redirect('list-consult-reply?id='+_id);
                       

            });

        } else{

           newpara = consultreplys[0].query + "+" + newpara;
           newpainEval = consultreplys[0].painEvaluation + "+" + newpainEval;
           newdate = consultreplys[0].notifydate + "+" + newdate;
            var set = {query : newpara , painEvaluation : newpainEval, notifydate : newdate};
          var _id = req.body.consultreply_id;

          // console.log(_id);
          console.log(set);
          Consultreplys.update(
               { _id: _id },
               { $set: set },
               function (err, docs) {

                 console.log(docs);

                      var set = {read_status: "1"};

                      var _id= req.body.current_id;

                      Consult.update(
                                  { _id: _id },
                                  { $set: set },
                                  function (err, doc) {

                                    // console.log(doc);

                                  });

                                 // console.log(docs);

            return res.redirect('list-consult-reply?id='+_id);
                             

                  });

              }


      });

      });

    app.post('/statusupdateread', isLoggedIn, function(req, res) {
   
    var Consultreplys = require('../app/models/consultreply');
    var Consult       = require('../app/models/consults');
   // var base64 = require('base-64');
    console.log(res);

                var set = {read_status: "1"};

                var _id= "5b51b70d88acca0734da0501";

                Consult.update(
                            { _id: _id },
                            { $set: set },
                            function (err, doc) {

                              console.log(doc);

                            });

    //  return res.redirect('consult');
                       



      });


    app.get('/productstatus', isLoggedIn, function(req, res) {
      // console.log(req.query);
   
  var Product       = require('../app/models/products');
       var _id = req.query.productid;
                 // console.log(ProductId);

                // var set = {product_status: req.query.prostatus};

          Product.findById(_id, function (err, product) {   

          // console.log(product);   
               
                Product.update(
                            { _id: _id },
                            { $set: {prostatus: req.query.prostatus} },
                            function (err, doc) {

                              console.log(doc);

                            });

     return res.redirect('product-list');
                       

       });

      });

	app.post('/product-insert', isLoggedIn, function(req, res) {
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');
		var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

        var set = {
	          productname: req.body.productname,
	          productname_chineese:req.body.productname_chineese,
	          productprice: req.body.productprice,
	          productdescr: req.body.productdescr,
	          productfulldescr: req.body.productfulldescr,
	          productcategory: req.body.productcategory,
	          prosize:req.body.prosize,
            total_stock : req.body.total_stock,
	          addInfo:req.body.addInfo,
	          producttype: req.body.producttype,
	          datetime: dates
       
        };

          var products = new Product(set);
          products.save(set,
            function (err, doc) {
            	console.log(doc);
            });
        
      // return res.redirect('product-list');
     return res.render('product.ejs', {user : req.user, successproduct: 'Product Added Successfully!!!' });


      });

	app.get('/product', isLoggedIn, function(req, res) {
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');

        res.render('product.ejs', {
			user : req.user 
		 });

      });


	app.get('/add-symptoms', isLoggedIn, function(req, res) {
var Product       = require('../app/models/products');
var User       = require('../app/models/user');
var Symptom       = require('../app/models/symptoms');
        var i = 0;
var vm = this;
    var make = false;
        vm.products = null;
        vm.allproducts = [];
       
        Product.find(function (err, products) {
  // docs is an array
   for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
       var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);

        //console.log(jsonObject);
     
      res.render('add-symptoms.ejs', {make , user : req.user , data: jsonObject });

      });

     });   

	app.get('/deletesymptom',isLoggedIn, function(req, res) {
	  var Addsymptoms       = require('../app/models/addsymptom');
	  var Addsymptomsfemales       = require('../app/models/addsymptomfemale');  
       Addsymptoms.remove({_id : req.query.id}, function (err, addsymptoms) {
         console.log(addsymptoms);    
      });
        Addsymptomsfemales.remove({_id : req.query.id}, function (err, addsymptomsfemales) {
         console.log(addsymptomsfemales);   		
      });
        return res.redirect('manage-symptoms');
	});

	app.get('/edit-symptommale', isLoggedIn, function(req, res) {
		
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');
		var Symptom       = require('../app/models/symptoms');
		var Addsymptoms       = require('../app/models/addsymptom');
		var Addsymptomsfemales       = require('../app/models/addsymptomfemale');   
        var i = 0;
        var j = 0;
        var k = 0;
		var vm = this;
        vm.products = null;
        vm.allproducts = [];
        vm.addsymptom = null;
        vm.alladdsymptom = [];
        vm.addsymptomfemale = null;
        vm.alladdsymptomfemale = [];
        var _id = req.query.id;
        Addsymptoms.find({_id : req.query.id},function (err, addsymptom) {
  		// docs is an array
  		  for(var j = 0; j < addsymptom.length; j++){
            vm.alladdsymptom[j] = addsymptom[j];
       }
       var productvalueaddsymptom = JSON.stringify(addsymptom);
        var jsonObjectaddsymptom = JSON.parse(productvalueaddsymptom);

        //console.log(jsonObject);

        Addsymptomsfemales.find({_id : req.query.id}, function (err, addsymptomfemale) {
  		// docs is an array
  		  for(var k = 0; k < addsymptomfemale.length; k++){
            vm.alladdsymptomfemale[k] = addsymptomfemale[k];
       }
       var productvalueaddsymptomfemale = JSON.stringify(addsymptomfemale);
        var jsonObjectaddsymptomfemale = JSON.parse(productvalueaddsymptomfemale);

        Product.find(function (err, products) {
  		// docs is an array
  		  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
       var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);
     
      res.render('edit-symptommale.ejs', {
			user : req.user , data: jsonObject , dataaddsymptom : jsonObjectaddsymptom , dataaddsymptomfemale :jsonObjectaddsymptomfemale , symptomid : req.query.id
		});

      });

     });   
   
    });

  });

	app.get('/edit-symptomfemale', isLoggedIn, function(req, res) {
		
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');
		var Symptom       = require('../app/models/symptoms');
		var Addsymptoms       = require('../app/models/addsymptom');
		var Addsymptomsfemales       = require('../app/models/addsymptomfemale');   
        var i = 0;
        var j = 0;
        var k = 0;
		var vm = this;
        vm.products = null;
        vm.allproducts = [];
        vm.addsymptom = null;
        vm.alladdsymptom = [];
        vm.addsymptomfemale = null;
        vm.alladdsymptomfemale = [];
        var _id = req.query.id;
        Addsymptoms.find({_id : req.query.id},function (err, addsymptom) {
  		// docs is an array
  		  for(var j = 0; j < addsymptom.length; j++){
            vm.alladdsymptom[j] = addsymptom[j];
       }
       var productvalueaddsymptom = JSON.stringify(addsymptom);
        var jsonObjectaddsymptom = JSON.parse(productvalueaddsymptom);

        //console.log(jsonObject);

        Addsymptomsfemales.find({_id : req.query.id}, function (err, addsymptomfemale) {
  		// docs is an array
  		  for(var k = 0; k < addsymptomfemale.length; k++){
            vm.alladdsymptomfemale[k] = addsymptomfemale[k];
       }
       var productvalueaddsymptomfemale = JSON.stringify(addsymptomfemale);
        var jsonObjectaddsymptomfemale = JSON.parse(productvalueaddsymptomfemale);

        Product.find(function (err, products) {
  		// docs is an array
  		  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
       var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);
     
      res.render('edit-symptomfemale.ejs', {
			user : req.user , data: jsonObject , dataaddsymptom : jsonObjectaddsymptom , dataaddsymptomfemale :jsonObjectaddsymptomfemale , symptomid : req.query.id
		});

      });

     });   
   
    });

  });

  app.get('/manage-symptoms', isLoggedIn, function(req, res) {
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');
		var Symptom       = require('../app/models/symptoms');
		var Addsymptoms       = require('../app/models/addsymptom');
		var Addsymptomsfemales       = require('../app/models/addsymptomfemale');   
        var i = 0;
        var j = 0;
        var k = 0;
		var vm = this;
        vm.products = null;
        vm.allproducts = [];
        vm.addsymptom = null;
        vm.alladdsymptom = [];
        vm.addsymptomfemale = null;
        vm.alladdsymptomfemale = [];
        
        Addsymptoms.find(function (err, addsymptom) {
  		// docs is an array
  		  for(var j = 0; j < addsymptom.length; j++){
            vm.alladdsymptom[j] = addsymptom[j];
       }
       var productvalueaddsymptom = JSON.stringify(addsymptom);
        var jsonObjectaddsymptom = JSON.parse(productvalueaddsymptom);

        //console.log(jsonObject);

        Addsymptomsfemales.find(function (err, addsymptomfemale) {
  		// docs is an array
  		  for(var k = 0; k < addsymptomfemale.length; k++){
            vm.alladdsymptomfemale[k] = addsymptomfemale[k];
       }
       var productvalueaddsymptomfemale = JSON.stringify(addsymptomfemale);
        var jsonObjectaddsymptomfemale = JSON.parse(productvalueaddsymptomfemale);

        Product.find(function (err, products) {
  		// docs is an array
  		  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
       var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);
     
      res.render('manage-symptoms.ejs', {
			user : req.user , data: jsonObject , dataaddsymptom : jsonObjectaddsymptom , dataaddsymptomfemale :jsonObjectaddsymptomfemale
		});

      });

     });   
   
    });

  });     

	app.post('/symptoms-insert', isLoggedIn, function(req, res) {

var Product = require('../app/models/products');
var User = require('../app/models/user');
var Addsymptoms = require('../app/models/addsymptom');
var Addsymptomsfemales = require('../app/models/addsymptomfemale');  
var i = 0;
var vm = this;
        vm.products = null;
        vm.allproducts = [];
    var make = true;
       
      Product.find(function (err, products) {
 
  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
      }

      var productvalue = JSON.stringify(products);
      var jsonObject = JSON.parse(productvalue);

        if (req.body.gender == 'male'){

        var set = {

              gender : req.body.gender,
              bodypartname : req.body.bodypartname,
              affectedareaname : req.body.affectedareaname,
              symptomname :req.body.symptomname,
              symptomdescription :req.body.symptomdescription,
              medincinename : req.body.medincinename
           
          };

          var addsymptom = new Addsymptoms(set);
            addsymptom.save(set, function (err, doc) {

            if(err) {


            } else {

              res.render('add-symptoms.ejs', { make , user : req.user , data: jsonObject });

            }
           
          });

        } else {

        var set = {

              gender : req.body.gender,
              bodypartfemale : req.body.bodypartfemale,
              affectedareafemale : req.body.affectedareafemale,
              symptomfemale :req.body.symptomfemale,
              symptomdescriptionfemale :req.body.symptomdescriptionfemale,
              medincinenamefemale : req.body.medincinenamefemale
           
          };

          var addsymptomfemale = new Addsymptomsfemales(set);

            addsymptomfemale.save(set, function (err, doc) {

              if(err) {

               
              } else {
               
                res.render('add-symptoms.ejs', { make , user : req.user , data: jsonObject });
             
              }
           
            });

        }

      });

   });   



	app.post('/symptoms-update', isLoggedIn, function(req, res) {
		//console.log(res);
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');
		var Addsymptoms       = require('../app/models/addsymptom');
		var Addsymptomsfemales       = require('../app/models/addsymptomfemale');   
   
        if (req.body.gender == 'male'){

        	var _id = req.body.symptomid;

        	//console.log(_id);

        	var set = {
             gender : req.body.gender,
             bodypartname : req.body.bodypartname,
             affectedareaname : req.body.affectedareaname,
             symptomname :req.body.symptomname,
             symptomdescription :req.body.symptomdescription,
             medincinename : req.body.medincinename
            
            };
				Addsymptoms.update(
		            { _id: _id },
		            { $set: set},

		            function (err, docs) {
		            //	console.log(err);
		              
		               //  console.log(docs);
		            });
         }else{

         	console.log("female");

         	var _id = req.body.symptomid;

        	var set = {
             gender : req.body.gender,
             bodypartfemale : req.body.bodypartfemale,
             affectedareafemale : req.body.affectedareafemale,
             symptomfemale :req.body.symptomfemale,
             symptomdescriptionfemale :req.body.symptomdescriptionfemale,
             medincinenamefemale : req.body.medincinenamefemale
            
            };

                Addsymptomsfemales.update(
		            { _id: req.body.symptomid},
		            { $set: set },
		            function (err, doc) {
		              
		                 //console.log(doc);
		            });

        }

        
        
     return res.redirect('manage-symptoms');

      });

	app.post('/symptoms-update', isLoggedIn, function(req, res) {
		//console.log(res);
		var Product       = require('../app/models/products');
		var User       = require('../app/models/user');
		var Addsymptoms       = require('../app/models/addsymptom');
		var Addsymptomsfemales       = require('../app/models/addsymptomfemale');   
		var i = 0;
		var vm = this;
        vm.products = null;
        vm.allproducts = [];
        
        Addsymptoms.find(function (err, addsymptom) {
  		// docs is an array
  		  for(var i = 0; i < addsymptom.length; i++){
            vm.alladdsymptom[i] = addsymptom[i];
       }
       var productvalue = JSON.stringify(addsymptom);
        var jsonObject = JSON.parse(productvalue);

        	//console.log(jsonObject);
        
       		//console.log(req.body.gender);

        if (req.body.gender == 'male'){

        	var _id = req.body.symptomid;

        	//console.log(_id);

        	//console.log(req.body.gender);

        	var set = {
             gender : req.body.gender,
             bodypartname : req.body.bodypartname,
             affectedareaname : req.body.affectedareaname,
             symptomname :req.body.symptomname,
             symptomdescription :req.body.symptomdescription,
             medincinename : req.body.medincinename
            
            };

            Addsymptoms.findById(_id, function (err, addsymptom){
				Addsymptoms.update(
		            { _id: _id },
		            { $set: set},

		            function (err, docs) {
		              
		                // console.log(docs);
		            });
            });

         }else{

         	//console.log("female");

         	var _id = req.body.symptomid;

        	var set = {
             gender : req.body.gender,
             bodypartfemale : req.body.bodypartfemale,
             affectedareafemale : req.body.affectedareafemale,
             symptomfemale :req.body.symptomfemale,
             symptomdescriptionfemale :req.body.symptomdescriptionfemale,
             medincinenamefemale : req.body.medincinenamefemale
            
            };

            Addsymptomsfemales.findById(_id, function (err, addsymptomfemale){

                Addsymptomsfemales.update(
		            { _id: req.body.symptomid},
		            { $set: set },
		            function (err, doc) {
		              
		                // console.log(doc);
		            });
           });     
        }

        
        
     return res.redirect('manage-symptoms');

      });

   });   



	app.post('/updateproduct', isLoggedIn, function(req, res) {

		var Product       = require('../app/models/products');
		var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

		var _id = req.body._id;
		console.log(_id);
		 var i = 0;
		var vm = this;
        vm.products = null;
        vm.allproducts = [];
		Product.find(function (err, products) {
  		// docs is an array
  		  for(var i = 0; i < products.length; i++){
            vm.allproducts[i] = products[i];
       }
        var productvalue = JSON.stringify(products);
        var jsonObject = JSON.parse(productvalue);

         Product.findById(_id, function (err, product) {
			        
			  //      console.log(user._id);

			          Product.update(
			            { _id: _id },
			            { $set: { 
			              productname: req.body.productname,
				          productname_chineese:req.body.productname_chineese,
				          productprice: req.body.productprice,
				          productdescr: req.body.productdescr,
				          productfulldescr: req.body.productfulldescr,
				          productcategory: req.body.productcategory,
				          prosize:req.body.prosize,
                  total_stock : req.body.total_stock,
				          addInfo:req.body.addInfo,
				          producttype: req.body.producttype,
				          datetime: dates} 
					     },
			            function (err, doc) {
			               // console.log(doc);        
			            });  

			    });

		 return res.redirect('product-list');
	});

	});	


	app.post('/updateorder', isLoggedIn, function(req, res) {

		var i = 0;
		var vm = this;
        vm.order = null;
        vm.allorders = [];

		var Order       = require('../app/models/orders');
		var _id = req.body.orderid;
		//console.log(_id);

	    var set = {o_status : req.body.o_status};

	    console.log(set);

	       Order.update(
	        { _id: _id },
	        { $set: set },
	        function (err, doc) {
	          
	             console.log(doc);
	        });


        return res.redirect('list-orderitem?order_id=' + req.body.orderid);

      });

	app.get('/deleteorder',isLoggedIn, function(req, res) {
	   var Order       = require('../app/models/orders');
       Order.remove({_id : req.query.order_id}, function (err, orders) {
         console.log(orders);    
		return res.redirect('manageorder');
      });
	});

	app.get('/refund',isLoggedIn, function(req, res) {
			//	console.log(req.query.order_id);
		var Order       = require('../app/models/orders');
		var Orderitem       = require('../app/models/orderitem');
		var Transactions       = require('../app/models/transaction');


	    var i = 0;
	    var j = 0;
		var vm = this;
        vm.order = null;
        vm.allorders = [];
        vm.transaction = null;
        vm.alltransactions = [];
        Transactions.find(function (err, transaction) {
  		// docs is an array
  		  for(var i = 0; i < transaction.length; i++){
            vm.allorders[i] = transaction[i];


        }
 
       var productvaluestransaction = JSON.stringify(transaction);
       var jsonObjectstransaction = JSON.parse(productvaluestransaction);

        Order.find(function (err, order) {
  		// docs is an array
  		  for(var i = 0; i < order.length; i++){
            vm.allorders[i] = order[i];


        }
 
       var productvalues = JSON.stringify(order);
       var jsonObjects = JSON.parse(productvalues);
       Orderitem.find({orderid : req.query.order_id}, function (err, orderitem) {
       var productvalue = JSON.stringify(orderitem);
       var jsonObject = JSON.parse(productvalue);

        console.log(jsonObject);

       // console.log(jsonObject[0].productname);

   
      res.render('refund.ejs', {data: jsonObject, datas: jsonObjects, datatransaction: jsonObjectstransaction, user : req.user , orderid : req.query.order_id});

      });


     });

	});

    });    

    app.post('/refundreturn',isLoggedIn, function(req, res) {
				//console.log(res);
		var Order       = require('../app/models/orders');
		var Orderitem       = require('../app/models/orderitem');
		var Transactions       = require('../app/models/transaction');
		var Refund       = require('../app/models/refunds');

		var orderid = req.body.orderid;
		var _id = req.body._id;
		var userid = req.body.userid;
		var chargeId = req.body.paymentId;

		var stripe = require("stripe")("sk_test_beRNx3hBDckaj2C0eLZYgrqP");

		var token = req.body.stripeToken; 
		var email = req.body.stripeEmail;


		var refund = stripe.refunds.create({
		  charge: chargeId,
		}, function(err, refund) {
		  // asynchronously called
		  console.log(refund);
		    var dates=  new Date();
		      var sets = {
		      	 refund_id: refund.id,
		      	 userid : userid,
		      	 orderid:orderid,
		      	 amount:refund.amount*0.01,
		      	 balance_transaction:refund.balance_transaction,
		      	 chargeId:refund.charge,
		      	 refundcreate:refund.created,
		      	 status:refund.status,
		      };
		      	var refunds = new Refund(sets);
		         refunds.save(sets,function (err, docs) {
		                    var subiidd = sets._id;
		         Transactions.update(
		         	{ _id: req.body._id },
		         	{ $set: {refundId:docs.refund_id,refundstataus:refund.status,} },
		            function (err, doc) {
		               console.log(doc);
		            });   
		                console.log(docs);
		            }); 
		});
		return res.redirect('managetransaction');

    });    

	app.get('/deletetransaction',isLoggedIn, function(req, res) {
	var Transactions       = require('../app/models/transaction');
       Transactions.remove({_id : req.query.transaction_id}, function (err, transaction) {
         console.log(transaction);    
		return res.redirect('managetransaction');
      });
	});

	app.get('/res-herbals', isLoggedIn, function(req, res) {

     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('res-herbals.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

      });   
	
	});





	app.get('/res-hplc', function(req, res) {
		res.render('res-hplc.ejs', {
		});
	});

	app.get('/res-hplcs', isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

      Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('res-hplcs.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

     });

      });
	});

	app.get('/res-organic', function(req, res) {
		res.render('res-organic.ejs', {
		});
	});

	app.get('/res-organics', isLoggedIn, function(req, res) {
      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('res-organics.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
	});

	app.get('/res-philosophy', function(req, res) {
		res.render('res-philosophy.ejs', {
		});
	});

  app.get('/about', function(req, res) {
    res.render('about.ejs', {
    });
  });

 app.get('/contact', function(req, res) {
    res.render('contact.ejs', {
    });
  });

 app.get('/disclaimerBfr', function(req, res) {
    res.render('disclaimerBfr.ejs', {
    });
  });

app.get('/privacyBefore', function(req, res) {
    res.render('privacyBefore.ejs', {
    });
  });

	app.get('/res-philosophys', isLoggedIn, function(req, res) {
   var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('res-philosophys.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

      });
	});

  app.get('/aboutus', isLoggedIn, function(req, res) {
   var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('aboutus.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

      });
  });

   app.get('/contactus', isLoggedIn, function(req, res) {
   var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('contactus.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

      });
  });
	app.get('/peo-comprofile', function(req, res) {
		res.render('peo-comprofile.ejs', {
		});
	});

	app.get('/peo-comprofiles', isLoggedIn, function(req, res) {
    var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
         var readstatuscount = 0; 
        var totalreadconsultstatus = 0

      var Consult       = require('../app/models/consults');

   
      //  Consult.find(function (err, consult) {
      //   // docs is an array
      //     for(var i = 0; i < consult.length; i++){
      //         vm.allconsults[i] = consult[i];
      //     }
   
      //    var productvalue = JSON.stringify(consult);
      //    var jsonObject = JSON.parse(productvalue);
     
      //   res.render('peo-comprofiles.ejs', {loadconsultdata: jsonObject, user : req.user});

      // });

       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

      Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        // res.render('account.ejs', {loadconsultdata: jsonObject, user : req.user ,totalreadconsultstatus : finalstatusconsult,});
        res.render('peo-comprofiles.ejs', {loadconsultdata: totalconsult, user : req.user,totalreadconsultstatus : finalstatusconsult});

       });

      });

	});

	app.get('/peo-fourgps', function(req, res) {
		res.render('peo-fourgps.ejs', {
		});
	});

	app.get('/peo-fourgpss', isLoggedIn, function(req, res) {
    var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
          var readstatuscount = 0; 
        var totalreadconsultstatus = 0

      var Consult       = require('../app/models/consults');

   
      //  Consult.find(function (err, consult) {
      //   // docs is an array
      //     for(var i = 0; i < consult.length; i++){
      //         vm.allconsults[i] = consult[i];
      //     }
   
      //    var productvalue = JSON.stringify(consult);
      //    var jsonObject = JSON.parse(productvalue);
     
      //   res.render('peo-fourgpss.ejs', {loadconsultdata: jsonObject, user : req.user});

      // });
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        // res.render('account.ejs', {loadconsultdata: jsonObject, user : req.user ,totalreadconsultstatus : finalstatusconsult,});
        // res.render('peo-comprofiles.ejs', {loadconsultdata: jsonObject, user : req.user,totalreadconsultstatus : finalstatusconsult});
         res.render('peo-fourgpss.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult});
     
     });

      });
	});



	app.get('/consult-online', function(req, res) {

		res.render('consult-online.ejs', {
		});
	});

	app.get('/consult-onlines',isLoggedIn, function(req, res) {
		var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('consult-onlines.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });

      });
    
	});


  app.get('/consult-onliness',isLoggedIn, function(req, res) {
    var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('consult-onliness.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult, succesconsult : 'Thank you for your information, our TCM doctor will respond in 24 hour.' , });

        });

      });
    
  });
  
 


    app.post('/charge', function(req, res) {

           var totalquantity = [];            
        var i = 0;
    var vm = this;
        vm.orderitem = null;
        vm.allorderitems = [];
        productqtt =[];
        quantityuse = [];
        remainquanty = [];

      var Product   = require('../app/models/products');
    	var Order       = require('../app/models/orders');
		var Orderitem       = require('../app/models/orderitem');
		var Transactions       = require('../app/models/transaction');
		var User       = require('../app/models/user');
		var stripe = require("stripe")("sk_test_beRNx3hBDckaj2C0eLZYgrqP");


    	var orderarray = req.body.ordervalues;
		var jsonObjectsss = JSON.parse(orderarray);

		var total = req.body.hdnCartTotals;
		var userid = req.body.userid;
		console.log(res);
		var dates=  new Date();
		var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
		//console.log(userid);


		console.log(jsonObjectsss);
		//console.log(orderarray);
		//console.log(total);
		var j = 0;

	     for(var j = 0; j < jsonObjectsss.length; j++){
	 		var set = {    
	                userid : req.body.userid,
	               shipfname:jsonObjectsss[0].Shippingfname,
	               shiplname: jsonObjectsss[0].Shippinglname,
	               autocomplete:jsonObjectsss[0].Shippingaddress,
	               postal_code: jsonObjectsss[0].Shippingpcode,
	               locality: jsonObjectsss[0].Shippingcity,
	               administrative_area_level_1: jsonObjectsss[0].Shippingstate,
	               country: jsonObjectsss[0].Shippingcountry,
	               shipphone: jsonObjectsss[0].Shippingphone,
	               shipemail: jsonObjectsss[0].Shippingemail,
	               shipc_email:jsonObjectsss[0].Shippingcemail,
	               billfname: jsonObjectsss[0].Billingfname,
	               billname: jsonObjectsss[0].Billinglname,
	               billemail: jsonObjectsss[0].Billingemail,
	               billaddress: jsonObjectsss[0].Billingaddress,
	               billcity: jsonObjectsss[0].Billingcity,
	               billstate:jsonObjectsss[0].Billingstate,
	               billcountry:jsonObjectsss[0].Billingcountry,
	                billstate1:jsonObjectsss[0].Billingstate1,
	               billcountry1:jsonObjectsss[0].Billingcountry1,
	               billcode: jsonObjectsss[0].Billingcode,
	               cardname: jsonObjectsss[0].CardName,
	               cardno: jsonObjectsss[0].CardNo,
	               cvvno: jsonObjectsss[0].Cvv,
	               exp_month: jsonObjectsss[0].CardExMnth,
	               exp_days: jsonObjectsss[0].CardExDay,
                  hdnCartTotal : req.body.hdnCartTotals,
                  stateTax : req.body.stateTaxs,
                  shippingAmtt : "3.99",
  	              o_status :"Pending",
  	              payment_method: "Card",
  	              datetime: strDate



	        };

	       var orders = new Order(set);

			orders.save(function(error, doc){
			    if(error){
			        res.json(error);
			    }
			    else{
			    	
			       // res.json(data);
			      console.log(doc); 

			       var objectId = doc._id; // this will return the id of object inserted
					//console.log(objectId);
					 newvalue = objectId;   

					//console.log(newvalue);  

					//return objectId; 


			Order.findOne({'_id': newvalue},function(err,docs){ 
		        console.log(docs);	
				var i = 0;
				var _id=docs._id;
				var shipfname =docs.shipfname;
				var autocomplete =docs.autocomplete;
				var postal_code = docs.postal_code ;
				var locality = docs.locality ;
				var country = "US" ;
				var administrative_area_level_1 = docs.administrative_area_level_1 ;
				var country = docs.country ;
				var shipphone = docs.shipphone ;
				var total = 0 ;
				var cartarray = req.body.cartvalues;
				var datacart = JSON.parse(cartarray);
				
				var finalval= newvalue;

				
	         for(var i = 0; i < datacart.length; i++){
	      
				//console.log(jsonObject[0].Product);
				 var total = total + (datacart[i].Price * datacart[i].Qty);
				// console.log(total);
				 var sets = {    
				                orderid : objectId,
				                productname: datacart[i].Product,
                        productid: datacart[i].ProductIds,
                        productstocks : datacart[i].ProductStocks,
				                productprice: datacart[i].Price,
				                productqty: datacart[i].Qty ,
				                datetime: strDate
				            };

				var orderitem = new Orderitem(sets);
				 
			

				orderitem.save(function(error, datas){
			    if(error){
			        res.json(error);
			    }
			    else{
			    	console.log(datas);
			    	//res.json(datas);
			     }


			    });

             }

	
			 console.log(newvalue);  
			 var finalval= newvalue;  

			var stripe = require("stripe")("sk_test_beRNx3hBDckaj2C0eLZYgrqP");
			//console.log(req);
			// Token is created using Stripe.js or Checkout!
			// Get the payment token ID submitted by the form:
			var token = req.body.stripeToken; // Using Express
			var email = req.body.stripeEmail;
			var finalval= newvalue;


			//console.log(finalval);
			// Charge the user's card:

			if(userid == 'guest'){
			  console.log("I am Guest User");

			  var charge = stripe.charges.create({
			  amount: total*100,
			  currency: "usd",
			 // email: email,
			  source: token,
			}, function(err, charge) {
			  // asynchronously called
			  //var payment = JSON.stringify(charge);
			  console.log(charge);
			 var set = {    
			                userid : "guest",
			                orderid : finalval,
			                paymentId: charge.id,
			                amount: charge.amount,
			                balance_transaction: charge.balance_transaction, 
			                created: charge.created, 
			                paid_status: charge.paid,
			                sourceId: charge.source.id, 
			                sourceObject: charge.source.object,
			                sourceBrand: charge.source.brand,
			                sourceCountry: charge.source.country,
			                sourceExpMonth: charge.source.exp_month, 
			                sourceExpYears: charge.source.exp_year, 
			                sourceFingerprint: charge.source.fingerprint, 
			                sourceFunding: charge.source.funding, 
			                sourceLast4: charge.source.last4,
			                sourceName: charge.source.name, 
			                datetime: strDate
			            };



				var transaction = new Transactions(set);
				 
			

				transaction.save(function(error, datas){
			    if(error){
			        res.json(error);
			    }
			    else{
			    	console.log(datas);
			    	var objectId = datas._id;
			    	//res.json(datas);

              Orderitem.find({"orderid" : finalval},function (err, orderitem) {

                             // console.log(orderitem.length)

                             for(var i = 0; i < orderitem.length; i++){
                             vm.allorderitems[i] = orderitem[i];
                
                              totalquantity[i] =  vm.allorderitems[i].productstocks;
                                quantityuse[i] =  vm.allorderitems[i].productqty;
                                // console.log("Deduct Qunaity" + quantityuse);
                              
                               remainquanty[i] = totalquantity[i] - quantityuse[i]; 

                                console.log(remainquanty[i]);

                              Product.update(
                                { _id: vm.allorderitems[i].productid },
                                { $set: {total_stock: remainquanty[i] } },
                                function (err, doct) {
                                  console.log(err);
                                  console.log(doct);              
                                });

                              // Orderitem.update(
                              //   { _id: vm.allorderitems[i].productid },
                              //   { $set: {productstocks: remainquanty[i] } },
                              //   function (err, docs) {
                              //     console.log(docs);              
                              //   });

                              }


                           });

			     }


			    });        


			});

			//return res.redirect('thanks');


			} 
			else {

			   console.log("I am Loggedin User");
			//console.log(finalval);

			  stripe.customers.create({
			 //  amount: total,
			 // currency: "usd",
			  email: email,
			  source: token,
			}).then(function(customer) {
			  // asynchronously called
			   //var customercreate = JSON.stringify(customer);
			  // console.log(customer);

			  //var amount = Math.round(total*100);

			   console.log(total);

			               
			  return stripe.charges.create({
			          amount: total*100,
			          currency: "usd",
			          customer: customer.id,
			        });




			    }).then(function(charge) {
			     //var payment = JSON.stringify(charge);

			      console.log(charge);
		   	 //console.log(charge.customer);
			 var _id=req.body.userid;
			 var set = {    
			                userid : _id,
			                orderid : finalval,
			                paymentId: charge.id,
			                amount: charge.amount,
			                balance_transaction: charge.balance_transaction, 
			                created: charge.created, 
			                paid_status: charge.paid,
			                sourceId: charge.source.id, 
			                sourceObject: charge.source.object,
			                sourceBrand: charge.source.brand,
			                sourceCountry: charge.source.country,
			                sourceExpMonth: charge.source.exp_month, 
			                sourceExpYears: charge.source.exp_year, 
			                sourceFingerprint: charge.source.fingerprint, 
			                sourceFunding: charge.source.funding, 
			                sourceLast4: charge.source.last4,
			                sourceName: charge.source.name, 
			                datetime: strDate
			            };



			  	var transaction = new Transactions(set);
				 
			

				transaction.save(function(error, datas){
			    if(error){
			        res.json(error);
			    }
			    else{
			    	console.log(datas);
			    	var objectId = datas._id;
			    	//res.json(datas);
             Orderitem.find({"orderid" : finalval},function (err, orderitem) {

                             // console.log(orderitem.length)

                             for(var i = 0; i < orderitem.length; i++){
                             vm.allorderitems[i] = orderitem[i];
                
                              totalquantity[i] =  vm.allorderitems[i].productstocks;
                                quantityuse[i] =  vm.allorderitems[i].productqty;
                                // console.log("Deduct Qunaity" + quantityuse);
                              
                               remainquanty[i] = totalquantity[i] - quantityuse[i]; 

                                console.log(remainquanty[i]);

                              Product.update(
                                { _id: vm.allorderitems[i].productid },
                                { $set: {total_stock: remainquanty[i] } },
                                function (err, doc) {
                                  console.log(doc);              
                                });

                              // Orderitem.update(
                              //   { _id: vm.allorderitems[i].productid },
                              //   { $set: {productstocks: remainquanty[i] } },
                              //   function (err, docs) {
                              //     console.log(docs);              
                              //   });

                              }


                           });
			     }


			    });     

			    User.findById(_id, function (err, user) {
			        
			        console.log(user.stripeChargeCustomerId);

			        if(!user.stripeChargeCustomerId){
			          User.update(
			            { _id: _id },
			            { $set: {stripeChargeCustomerId:charge.customer} },
			            function (err, doc) {
			               console.log(doc);         
			            });  

			        }else{
			        }

			    });


			            });

			   // return res.redirect('charge_thanks');


			}


			      });

			if(userid == 'guest'){

			return res.redirect('thanks');
			} else{

			return res.redirect('charge_thanks');

			  }


			}

	});

	}

	});





      var fs =  require('fs');
      var express = require('express');
      var multer = require('multer');
      var uploads = multer({ dest: 'public/uploads/consults/'});
	app.post('/consultonlinedata-insert', function(req, res) {
    console.log(res);

      var User = require('../app/models/user');
      var file = 'public/uploads/consults/' + req.files.myimage.originalFilename;
     // console.log(req.files.myimage.path);
     // console.log(req.body.email);
      var dates=  new Date();
      var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
      fs.rename(req.files.myimage.path, file, function(err) {
       if (err) {
          console.log(file);
          //console.log(err);
          res.send(500);
        } else {
          var imageName = req.files.myimage.originalFilename;
          var imagepath = {};
          imagepath['originalname'] = imageName; 

          var symptom_ruing1 = req.body.symptom_ruing;
          if(symptom_ruing1 == ""){
            symptom_ruing1 = "null";
          }
          var symptom_thirty1 = req.body.symptom_thirty;
          if(symptom_thirty1 == ""){
            symptom_thirty1 = "null";
          }
          var symptom_cough1 = req.body.symptom_cough;
          if(symptom_cough1 == ""){
            symptom_cough1 = "null";
          }
          var symptom11 = req.body.symptom1;
          if(symptom11 == ""){
            symptom11 = "null";
          }
          var btemp1 = req.body.btemp;
           if(btemp1 == ""){
            btemp1 = "null";
          }
          var btime1 = req.body.btime;
          if(btime1 == ""){
            btime1 = "null";
          }
          var bside1 = req.body.bside;
          if(bside1 == ""){
            bside1 = "null";
          }
          var body1 = req.body.body;
          if(body1 == ""){
            body1 = "null";
          }
          var headache1 = req.body.headache;
          if(headache1 == ""){
            headache1 = "null";
          }
          var sweatPain1 = req.body.sweatPain;
          if(sweatPain1 == ""){
            sweatPain1 = "null";
          }
          var sweatTime1 = req.body.sweatTime;
          if(sweatTime1 == ""){
            sweatTime1 = "null";
          }
          var sleep1 = req.body.sleep;
           if(sleep1 == ""){
            sleep1 = "null";
          }
          var sleepTime1 = req.body.sleepTime;
           if(sleepTime1 == ""){
            sleepTime1 = "null";
          }
          var bmove1 = req.body.bmove;
          if(bmove1 == ""){
            bmove1 = "null";
          }
          var constipation1 = req.body.constipation;
          if(constipation1 == ""){
            constipation1 = "null";
          }
          var btype1 = req.body.btype;
          if(btype1 == ""){
            btype1 = "null";
          }
          var bWater1 = req.body.bWater;
          if(bWater1 == ""){
            bWater1 = "null";
          }
          var bSmell1 = req.body.bSmell;
          if(bSmell1 == ""){
            bSmell1 = "null";
          }
          var bColor1 = req.body.bColor;
          if(bColor1 == ""){
            bColor1 = "null";
          }
          var urnieType1 = req.body.urnieType;
          if(urnieType1 == ""){
            urnieType1 = "null";
          }
          var ployuria1 = req.body.ployuria;
          if(ployuria1 == ""){
            ployuria1 = "null";
          }
          var urnieColor1 = req.body.urnieColor;
          if(urnieColor1 == ""){
            urnieColor1 = "null";
          }
          var urnieSmell1 = req.body.urnieSmell;
          if(urnieSmell1 == ""){
            urnieSmell1 = "null";
          }
          var chest1 = req.body.chest;
          if(chest1 == ""){
            chest1 = "null";
          }
          var stomach1 = req.body.stomach;
          if(stomach1 == ""){
            stomach1 = "null";
          }
          var dailyDietWater1 = req.body.dailyDietWater;
          if(dailyDietWater1 == ""){
            dailyDietWater1 = "null";
          }
          var dailyDietDrink1 = req.body.dailyDietDrink;
          if(dailyDietDrink1 == ""){
            dailyDietDrink1 = "null";
          }
          var dailyDietFood1 = req.body.dailyDietFood;
          if(dailyDietFood1 == ""){
            dailyDietFood1 = "null";
          }
          var menstruation1 = req.body.menstruation;
          if(menstruation1 == ""){
            menstruation1 = "null";
          }
          var menstruationColor1 = req.body.menstruationColor;
           if(menstruationColor1 == ""){
            menstruationColor1 = "null";
          }
          var menstruationPain1 = req.body.menstruationPain;
           if(menstruationPain1 == ""){
            menstruationPain1 = "null";
          }
          var menstruationVolume1 = req.body.menstruationVolume;
           if(menstruationVolume1 == ""){
            menstruationVolume1 = "null";
          }
          var age1 = req.body.age;
          if(age1 == ""){
            age1 = "null";
          }
          var addinfo1 = req.body.addinfo;
          if(addinfo1 == ""){
            addinfo1 = "null";
          }
          var preferTreatment1 = req.body.preferTreatment;
          if(preferTreatment1 == ""){
            preferTreatment1 = "null";
          }
          var treatmentFeedback1 = req.body.treatmentFeedback;
          if(treatmentFeedback1 == ""){
            treatmentFeedback1 = "null";
          }
          var locationPain1 = req.body.locationPain;
          if(locationPain1 == ""){
            locationPain1 = "null";
          }
      var setencode = {    
               user_id : req.user._id,
               // problem: Base64.encode(req.body.problem),
               // problemdetail: Base64.encode(req.body.problemdetail),
               // problemarea : Base64.encode(req.body.problemarea),
               symptom_ruing: symptom_ruing1,
               symptom_thirty : symptom_thirty1,
               symptom_cough : symptom_cough1,
               symptom1 : symptom11,
               btemp : btemp1,
               btime : btime1,
               bside : bside1,
               body : body1,
               headache : headache1,
               sweatPain : sweatPain1,
               sweatTime : sweatTime1,
               sleep : sleep1,
               sleepTime : sleepTime1,
               bmove : bmove1,
               constipation : constipation1,
               btype : btype1,
               bWater : bWater1,
               bSmell : bSmell1,
               bColor : bColor1,
               urnieType : urnieType1,
               ployuria : ployuria1,
               urnieColor : urnieColor1,
               urnieSmell : urnieSmell1,
               chest : chest1,
               stomach : stomach1,
               dailyDietWater : dailyDietWater1,
               dailyDietDrink : dailyDietDrink1,
               dailyDietFood : dailyDietFood1,
               menstruation : menstruation1,
               menstruationColor : menstruationColor1,
               menstruationPain : menstruationPain1,
               menstruationVolume : menstruationVolume1,
               age : age1,
               addinfo : addinfo1,
               preferTreatment : preferTreatment1,
               treatmentFeedback : treatmentFeedback1,
               locationPain : locationPain1,
               datetime : strDate,
               view_consult_status: "0",
               read_status: "0",
               doctor_read_status: "0",
               myimage: imagepath      
        };  

    // console.log(setencode);
    var Consult  = require('../app/models/consults');
    var consults = new Consult(setencode);
    consults.save(function(error, dataconsult){
          if(error){
              res.json(error);
              //console.log(error); 
          }
          else{
              console.log(dataconsult); 
            // var aws = require('aws-sdk');
            // aws.config.loadFromPath('newconfig.json');
            // var ses = new aws.SES({apiVersion: '2010-12-01'});
            //     var to = [req.body.email]
            //     var from = 'jain.akash@novasoftcorps.com'

            //     ses.sendEmail( 
            //       { 
            //         Source: from, 
            //         Destination: { ToAddresses: to },
            //         Message: {
            //           Subject: {
            //             Data: 'Consult Problem'
            //           },
            //           Body: {
            //             Html: {
            //             Data: "<b>"+ "<p>Thankyou for consult your problem to GREENLIVING..</p>" +"</b>" // html body',
            //             }
            //           }
            //         }
            //       }).promise();
       
       
          }



        req.flash('locals.succesconsult', 'Thank you for your information, our TCM doctor will respond in 24 hour.');
         return res.redirect('/consult-onliness'); 

       });

      }

      });

     // var base64 = require('base-64');
     // var Base64 = require('js-base64').Base64;

 //      fs.rename(req.files.myimage.path, file, function(err) {
 //        if (err) {
 //          console.log(file);
 //          //console.log(err);
 //          res.send(500);
 //        } else {
 //          var imageName = req.files.myimage.originalFilename;
 //          var imagepath = {};
 //          imagepath['originalname'] = imageName;
 //          var setencode = {    
 //               user_id : req.user._id,
 //               problem: Base64.encode(req.body.problem),
 //               problemdetail: Base64.encode(req.body.problemdetail),
 //               problemarea : Base64.encode(req.body.problemarea),
 //               datetime : strDate,
 //               view_consult_status: "0",
 //               read_status: "0",
 //               doctor_read_status: "0",
 //               myimage: imagepath      
 //        };  

 //    // console.log(setencode);
 //    var Consult  = require('../app/models/consults');
 //    var consults = new Consult(setencode);
 //    consults.save(function(error, dataconsult){
 //          if(error){
 //              res.json(error);
 //              //console.log(error); 
 //          }
 //          else{
 //            // res.json(data);
 //           // console.log(dataconsult); 
 //            // var aws = require('aws-sdk');
 //            // aws.config.loadFromPath('newconfig.json');
 //            // var ses = new aws.SES({apiVersion: '2010-12-01'});
 //            //     var to = [req.body.email]
 //            //     var from = 'jain.akash@novasoftcorps.com'

 //            //     ses.sendEmail( 
 //            //       { 
 //            //         Source: from, 
 //            //         Destination: { ToAddresses: to },
 //            //         Message: {
 //            //           Subject: {
 //            //             Data: 'Consult Problem'
 //            //           },
 //            //           Body: {
 //            //             Html: {
 //            //             Data: "<b>"+ "<p>Thankyou for consult your problem to GREENLIVING..</p>" +"</b>" // html body',
 //            //             }
 //            //           }
 //            //         }
 //            //       }
 //            //     , function(err, data) {
 //            //       if(err) throw err
 //            //       console.log('Email sent:');
 //            //       console.log(data);
 //            //     });
      
     
 //        }

 
      

 //    });

 //    // req.flash('locals.succesconsult', 'Consultation Successfully!!!');
 //       return res.redirect('/consult-onliness'); 
  
 //  }


  
	
	// });


  });   


      var fs =  require('fs');
      var express = require('express');
      var multer = require('multer');
      var uploads = multer({ dest: 'public/uploads/consults/'});

   app.post('/ConsultsImageapi', function(req, res) {

      var User = require('../app/models/user');
      var file = 'public/uploads/consults/' + req.files.myimage.originalFilename;
     // console.log(req.files.myimage.path);
     // console.log(req.body.email);
      var dates=  new Date();
      var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
     // var base64 = require('base-64');
     var Base64 = require('js-base64').Base64;

      fs.rename(req.files.myimage.path, file, function(err) {
        if (err) {
          console.log(file);
          //console.log(err);
          res.send(500);
        } else {
          var imageName = req.files.myimage.originalFilename;
          var imagepath = {};
          imagepath['originalname'] = imageName;
          var setencode = {
               user_id: req.body.userid,    
               myimage: imagepath      
        };  

    // console.log(setencode);
    var Consult  = require('../app/models/consults');
    var consults = new Consult(setencode);
    consults.save(function(error, dataconsult){
          if(error){
              //res.json({status:500 , error});
                res.status(500).json({status:500 , error});

              //console.log(error); 
          }
          else{
             // res.json({status:200, dataconsult});
             res.status(200).json({status:200 , dataconsult});
          // console.log(dataconsult); 
       
        }
    });
    
  }
    
  });  

      });  


 // app.post('/Consultsapi/:_id', function(req, res) {
     app.post('/Consultsapi', function(req, res) {
      var Consult  = require('../app/models/consults');
   //   Consult.find({_id:req.params._id},function(err,docs){

            // if (err) {

            //   //res.send({ status :500, error: "Failed to get all consults"});

            //   res.status(500).json({ status :500, error: "Failed to get all consults"});


            // } else { 
            
          //   res.send({ status:200 , docs});


            var dates=  new Date();
            var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
           // var base64 = require('base-64');
          // var Base64 = require('js-base64').Base64;

          //  var ids = [];

    var set = {
             user_id: req.body.userid,
         //       problem: Base64.encode(req.body.problem),
         // problemdetail: Base64.encode(req.body.problemdetail),
         //   problemarea: Base64.encode(req.body.problemarea),
          symptom_ruing: req.body.symptom_ruing,
               symptom_thirty : req.body.symptom_thirty,
               symptom_cough : req.body.symptom_cough,
               symptom1 : req.body.symptom1,
               btemp : req.body.btemp,
               btime : req.body.btime,
               bside : req.body.bside,
               body : req.body.body,
               headache : req.body.headache,
               sweatPain : req.body.sweatPain,
               sweatTime : req.body.sweatTime,
               sleep : req.body.sleep,
               sleepTime : req.body.sleepTime,
               bmove : req.body.bmove,
               constipation : req.body.constipation,
               btype : req.body.btype,
               bWater : req.body.bWater,
               bSmell : req.body.bSmell,
               bColor : req.body.bColor,
               urnieType : req.body.urnieType,
               ployuria : req.body.ployuria,
               urnieColor : req.body.urnieColor,
               urnieSmell : req.body.urnieSmell,
               chest : req.body.chest,
               stomach : req.body.stomach,
               dailyDietWater : req.body.dailyDietWater,
               dailyDietDrink : req.body.dailyDietDrink,
               dailyDietFood : req.body.dailyDietFood,
               menstruation : req.body.menstruation,
               menstruationColor : req.body.menstruationColor,
               menstruationPain : req.body.menstruationPain,
               menstruationVolume : req.body.menstruationVolume,
               age : req.body.age,
               addinfo : req.body.addinfo,
               preferTreatment : req.body.preferTreatment,
               treatmentFeedback : req.body.treatmentFeedback,
               locationPain : req.body.locationPain,
               datetime: strDate,
               view_consult_status: "0",
               read_status: "0",
               doctor_read_status: "0"
          
        };

         var consults = new Consult(set);
          consults.save(function(error, dataconsult){
                if(error){
                    //res.json({status:500 , error});
                      res.status(500).json({status:500 , error});

                    //console.log(error); 
                }
                else{
                   // res.json({status:200, dataconsult});
                   res.status(200).json({status:200 , dataconsult});
                // console.log(dataconsult); 
             
              }
          });

        //  Consult.update( { _id: req.params._id },
        //     { $set: set },
        // function (err, consults) {

        //     if (err){

        //        // res.send({ status :500, error: "There was no consults."});

        //         res.status(500).json({ status :500, error: "There was no consults."});


        //     }else {

        //         //res.send({status :200, consults});
        //         res.status(200).json({ status :200, consults});


        //     }

        // });


   //  }
    
  // });  

   });  


	app.get('/account',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
        vm.hpdetail = null;
        vm.allhpdetail = [];

    var Consult       = require('../app/models/consults');
     var Hpdetail    = require('../app/models/hpdetail'); 
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);


      Hpdetail.find(function (err, hpdetail) {
      
       var hpdetailvalue = JSON.stringify(hpdetail);
       var jsonObjecthpdetail = JSON.parse(hpdetailvalue);
       // console.log(jsonObjecthpdetail);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('account.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,datahp : jsonObjecthpdetail ,});

       });

      });

       });
	
	});




  app.get('/hp',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
        vm.hpdetail = null;
        vm.allhpdetail = [];

    var Consult       = require('../app/models/consults');
     var Hpdetail    = require('../app/models/hpdetail'); 
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);


      Hpdetail.find(function (err, hpdetail) {
      
       var hpdetailvalue = JSON.stringify(hpdetail);
       var jsonObjecthpdetail = JSON.parse(hpdetailvalue);
       // console.log(jsonObjecthpdetail);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('hp.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,datahp : jsonObjecthpdetail ,});

       });

      });

       });
  
  });


  app.get('/costing',isLoggedIn, function(req, res) {
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
        vm.discount = null;
        vm.alldiscounts = [];
         vm.shipping = null;
        vm.allshippings = [];
    var Discount       = require('../app/models/discount');    
    var Consult       = require('../app/models/consults');
     var Shipping       = require('../app/models/shipping'); 
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;

         Shipping.find(function (err, shipping) {
        // docs is an array
          for(var t = 0; t < shipping.length; t++){
              vm.allshippings[t] = shipping[t];
              
          }   
         var productvalueshipping = JSON.stringify(shipping);
         var jsonObjectshipping = JSON.parse(productvalueshipping);

          Discount.find(function (err, discount) {
        // docs is an array
          for(var k = 0; k < discount.length; k++){
              vm.alldiscounts[k] = discount[k];
              
          }   
         var productvaluediscount = JSON.stringify(discount);
         var jsonObjectdiscount = JSON.parse(productvaluediscount);
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

            Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {


          res.render('costing.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult, datadiscount : jsonObjectdiscount , datashipping : jsonObjectshipping


         });

        });

      });
  
  });

 }); 

 });         

  app.post('/discount-update', isLoggedIn, function(req, res) {

    var User = require('../app/models/user');
    var Discount       = require('../app/models/discount'); 
    var Shipping       = require('../app/models/shipping');  
    var dates=  new Date();
    var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

    var _id = req.body.userid;
    console.log(_id);
      var a = 0;
      var vm = this ;
        vm.consult = null;
        vm.allconsults = [];
        vm.discount = null;
        vm.alldiscounts = [];
        vm.shipping = null;
        vm.allshippings = [];
        var answerstatuscount = 0;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;


      var Consult       = require('../app/models/consults');

      Shipping.find(function (err, shipping) {
        // docs is an array
          for(var k = 0; k < shipping.length; k++){
              vm.allshippings[k] = shipping[k];
              
          }   
         var productvalueshipping = JSON.stringify(shipping);
         var jsonObjectshipping = JSON.parse(productvalueshipping);


      
   
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
               if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          }
          var finalstatusconsult = readstatuscount ;
          var productvalueconsult = JSON.stringify(consult);
          var jsonObjectconsult = JSON.parse(productvalueconsult);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {
          var user_role = req.body.user_role;

          User.findById(_id, function (err, user) {
              
            if(user.user_role == 'admin'){

              Discount.update( { $set: {  discount: req.body.discount, status: "0"} },function (err, doc) {
                             console.log(doc);    

                console.log('one');
  
              });  
            
            }
      
          });
          // var setencode =  {  discount: req.body.discount,
    //                      status: "0"};

    //   var discounts = new Discount(setencode);
    // discounts.save(function(error, dataconsult){
    //       if(error){
    //           //res.json({status:500 , error});
    //             res.status(500).json({status:500 , error});

    //           //console.log(error); 
    //       }
    //       else{
    //          // res.json({status:200, dataconsult});
    //          res.status(200).json({status:200 , dataconsult});
    //       // console.log(dataconsult); 
       
    //     }
    // });
            
            setTimeout(() => {  

              console.log('two');
              Discount.find(function (err, discount) {
                
                for(var k = 0; k < discount.length; k++){
                    vm.alldiscounts[k] = discount[k];
                    
                } 

            

              var productvaluediscount = JSON.stringify(discount);
              var jsonObjectdiscount = JSON.parse(productvaluediscount);

              res.render('costing.ejs', {
                user : req.user , loadconsultdata : totalconsult, totalreadconsultstatus : finalstatusconsult, succesproupdate: 'Updated!!!', datadiscount : jsonObjectdiscount,datashipping : jsonObjectshipping
              });

            });

          }, 2000);

        });  

      });    

    });

  });   


  app.post('/shipping-update', isLoggedIn, function(req, res) {
    console.log(res);
    var User       = require('../app/models/user');
    var Discount       = require('../app/models/discount');
    var Shipping       = require('../app/models/shipping');  
    var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

    var _id = req.body.userid;
    console.log(_id);
      var a = 0;
      var vm = this ;
        vm.consult = null;
        vm.allconsults = [];
        vm.discount = null;
        vm.alldiscounts = [];
        vm.shipping = null;
        vm.allshippings = [];
        var answerstatuscount = 0;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;


        var Consult       = require('../app/models/consults');

     

          Discount.find(function (err, discount) {
      
          for(var k = 0; k < discount.length; k++){
              vm.alldiscounts[k] = discount[k];
              
          }   
         var productvaluediscount = JSON.stringify(discount);
         var jsonObjectdiscount = JSON.parse(productvaluediscount);
   
   
           Consult.find(function (err, consult) {
       
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];

               if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      if(totalreadstatusc != '1'){

                        readstatuscount += 1;

                      }

                }
              }
          }
          var finalstatusconsult = readstatuscount ;
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

          var user_role = req.body.user_role;

          User.findById(_id, function (err, user) {
              
            if(user.user_role == 'admin'){
              Shipping.update( { $set: {  standard_shipping: req.body.standard_shipping,
                               express_shipping: req.body.express_shipping,
                           status: "0"}},function (err, doc) {
                     
                       console.log("one");       
                    });  
            }
          
          });
          // var setencode =  {  standard_shipping: req.body.standard_shipping,
    //                          express_shipping: req.body.express_shipping,
    //                      status: "0"};

    //   var shipping = new Shipping(setencode);
    // shipping.save(function(error, dataconsult){
    //       if(error){
    //           //res.json({status:500 , error});
    //             res.status(500).json({status:500 , error});

    //           //console.log(error); 
    //       }
    //       else{
    //          // res.json({status:200, dataconsult});
    //          res.status(200).json({status:200 , dataconsult});
    //       // console.log(dataconsult); 
       
    //     }
    // });

         setTimeout(() => {  

          Shipping.find(function (err, shipping) {
              
              console.log('two');
          for(var k = 0; k < shipping.length; k++){
              vm.allshippings[k] = shipping[k];
              
          }   

          var productvalueshipping = JSON.stringify(shipping);
          var jsonObjectshipping = JSON.parse(productvalueshipping);

        res.render('costing.ejs', {

          user : req.user , loadconsultdata : totalconsult, totalreadconsultstatus : finalstatusconsult, succesproupdate: 'Updated!!!',  datadiscount : jsonObjectdiscount , datashipping : jsonObjectshipping
           
            });

          });

        },2000);  

      });    

    }); 

  });  

 }); 

	app.post('/profile-update', isLoggedIn, function(req, res) {

var User = require('../app/models/user');
    var Hpdetail = require('../app/models/hpdetail');
var dates=  new Date();
    var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
var _id = req.body.userid;
console.log(_id);
      var a = 0;
      var vm = this ;
        vm.consult = null;
        vm.allconsults = [];
        var answerstatuscount = 0;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;

      var Consult = require('../app/models/consults');
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
               if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                     
                         }
                    }


              }
          }
          var finalstatusconsult = readstatuscount ;
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);

      Hpdetail.find(function (err, hpdetail) {
     
        var hpdetailvalue = JSON.stringify(hpdetail);
        var jsonObjecthpdetail = JSON.parse(hpdetailvalue);
   
      var user_role = req.body.user_role;

        User.findById(_id, function (err, user) {

          console.log('one ');
 
          User.update( { _id: _id }, { $set: {  firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone :req.body.phone,
              user_role : req.body.user_role,
              address : req.body.address,
                         licenseData : req.body.licenseData,
              datetime : strDate}
     },function (err, doc) {
              console.log(doc);        
           });  

   });

          setTimeout(() => {

        User.findById(_id, function (err, userdata) {

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

          res.render('account.ejs', { datahp : jsonObjecthpdetail, user : userdata , loadconsultdata : totalconsult, totalreadconsultstatus : finalstatusconsult, succesproupdate: 'Profile-Updated!!!'

        });

          });

     });

        }, 2000);

      });  

    });

  });



 app.post('/hpdetail-update', isLoggedIn, function(req, res) {

    var User       = require('../app/models/user');
     var Hpdetail    = require('../app/models/hpdetail'); 

    var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

    var _id = req.body.userid;
    console.log(_id);
      var a = 0;
      var vm = this ;
        vm.consult = null;
        vm.allconsults = [];
        vm.hpdetail = null;
        vm.allhpdetail = [];
        var answerstatuscount = 0;
        var readstatuscount = 0;
        var totalreadconsultstatus = 0;


      var Consult       = require('../app/models/consults');
   
       Consult.find(function (err, consult) {
        // docs is an array
          for(var a = 0; a < consult.length; a++){
              vm.allconsults[a] = consult[a];
               if(req.user.user_role == 'user'){

                if(req.user._id == consult[a].user_id){

                      var totalreadstatusc = consult[a].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }
          }
          var finalstatusconsult = readstatuscount ;
   
         var productvalueconsult = JSON.stringify(consult);
         var jsonObjectconsult = JSON.parse(productvalueconsult);

           Hpdetail.find(function (err, hpdetail) {
      
       var hpdetailvalue = JSON.stringify(hpdetail);
       var jsonObjecthpdetail = JSON.parse(hpdetailvalue);
       // console.log(jsonObjecthpdetail);

   

    var user_role = req.body.user_role;

     var hpIds = req.body.hpId;

       Hpdetail.findById({"_id": hpIds },function (err, hpdetail) {
              
        //      console.log(user._id);

                Hpdetail.update(
                  { _id: hpIds },
                  { $set: {  licenseId: req.body.licenseId,
                         issueDate: req.body.issueDate,
                         expDate :req.body.expDate,
                         whereHear : req.body.whereHear,
                         interested : req.body.interested,
                         mobile : req.body.mobile,
                         ofcphone : req.body.ofcphone,
                         datetime : strDate} 
               },
                  function (err, doc) {
                     console.log(doc);        
                  });  

          });

 Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {
     

    res.render('account.ejs', {
      user : req.user , loadconsultdata : totalconsult, totalreadconsultstatus : finalstatusconsult, succesproupdate: 'Profile-Updated!!!',datahp : jsonObjecthpdetail ,
    });
  });
 });  
});
 });    

	app.get('/edit-user', isLoggedIn, function(req, res) {

		var User       = require('../app/models/user');
   var Hpdetail    = require('../app/models/hpdetail'); 


		var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

		var userid = req.query.id;
		//console.log(userid);

		var i = 0;
    var j = 0;
		var vm = this;
        vm.user = null;
        vm.allusers = [];
        vm.hpdetail = null;
        vm.allhpdetail = [];

		var user_role = req.body.user_role;

    User.find(function (err, user) {
      // docs is an array
        for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);


		 Hpdetail.find(function (err, hpdetail) {
  		
       var hpdetailvalue = JSON.stringify(hpdetail);
       var jsonObjecthpdetail = JSON.parse(hpdetailvalue);
       console.log(jsonObjecthpdetail);

		res.render('edit-user.ejs', {
			user : req.user , data : jsonObjectuser , datahp : jsonObjecthpdetail , userid : req.query.id ,
		});

	});

	});

  });	 

   app.post('/updateuserstatus', isLoggedIn, function(req, res) {

    console.log(req.body.sub);


    var User       = require('../app/models/user');
    var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

    var _id = req.body.userid;
  //  console.log(_id);
    var i = 0;
    var vm = this;
    vm.user = null;
        vm.allusers = [];

       User.find(function (err, user) {
      // docs is an array
        for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);

       if(req.body.sub == 'Activate'){

        User.findById({_id : req.body.userid}, function (err, user) {
              
          // console.log(user);
           //console.log(_id);
                User.update(
                  { _id: _id },
                  { $set: {first_time_login: "False" } 
               },
                  function (err, doc) {
                     console.log(doc);        
                  });  

          });

       } else {

            User.findById({_id : req.body.userid}, function (err, user) {
              
          // console.log(user);
           //console.log(_id);
                User.update(
                  { _id: _id },
                  { $set: {first_time_login: "True" } 
               },
                  function (err, doc) {
                     console.log(doc);        
                  });  

          });

       }

    res.render('admin.ejs', {
      user : req.user , datauser : jsonObjectuser ,
    });
  });
   
   });


	app.post('/updateuser', isLoggedIn, function(req, res) {

		var User       = require('../app/models/user');
		var dates=  new Date();
        var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

		var _id = req.body.userid;
	//	console.log(_id);
		var i = 0;
		var vm = this;
		vm.user = null;
        vm.allusers = [];

	     User.find(function (err, user) {
  		// docs is an array
  		  for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);


         User.findById({_id : req.body.userid}, function (err, user) {
			        
			     console.log(user);
			     console.log(_id);
			          User.update(
			            { _id: _id },
			            { $set: {  firstName: req.body.firstName,
					               lastName: req.body.lastName,
					               phone :req.body.phone,
					               user_role : req.body.user_role,
					               address : req.body.address,
					               datetime : strDate} 
					     },
			            function (err, doc) {
			               console.log(doc);        
			            });  

			    });

		res.render('admin.ejs', {
			user : req.user , datauser : jsonObjectuser ,
		});
	});
   
   });


    var fs =  require('fs');
    var express = require('express');
    var multer = require('multer');
    var upload = multer({ dest: 'public/csv'});
		app.post('/word-upload', function(req, res) {

       // console.log(req.files);


      var file = 'public/csv/' + req.files.avatar.originalFilename;

      var passUrl = req.body.dataUrl;
       
      // console.log(passUrl);

      // var checkdataval = req.body.checkdata;
         // console.log(checkdataval);

      fs.rename(req.files.avatar.path, file, function(err) {
        if (err) {
          // console.log(err);
          res.send(500);
        } else {

             var string = encodeURIComponent('something that would break');

              // let rawdata = fs.readFileSync('public/json/userdetail.json');
              // let userdetail = JSON.parse(rawdata);
              // // let userdetailNew = JSON.parse(userdetail);
              // console.log(userdetail);  
              // console.log(userdetail.name);
              // var userdetailt = { name: req.body.checkdata};

              // let data = JSON.stringify(userdetailt, null, 2);

              // fs.writeFile('public/json/userdetail.json', data, (err) => {
              //     if (err) throw err;
              //     console.log('Data written to file');
              // });
            

              return res.redirect("/csvlist?tokendata="+passUrl+"&msg="+string);

        

        }

      });

	});


    var fs =  require('fs');
    var express = require('express');
    var multer = require('multer');
    var upload = multer({ dest: 'public/csv'});
    app.post('/blcklist-upload', function(req, res) {

       // console.log(req.files);


      var file = 'public/csv/' + req.files.avatar.originalFilename;

      var passUrl = req.body.dataUrl;
       
      // console.log(passUrl);

      // var checkdataval = req.body.checkdata;
         // console.log(checkdataval);

      fs.rename(req.files.avatar.path, file, function(err) {
        if (err) {
          // console.log(err);
          res.send(500);
        } else {
              var string = encodeURIComponent('something that would break');

              // let rawdata = fs.readFileSync('publicpublic/json/userdetail.json');
              // let userdetail = JSON.parse(rawdata);
              // // let userdetailNew = JSON.parse(userdetail);
              // console.log(userdetail);  
              // console.log(userdetail.name);
              // var userdetailt = { name: req.body.checkdata};

              // let data = JSON.stringify(userdetailt, null, 2);

              // fs.writeFile('publicpublic/json/blcklistdetail.json', data, (err) => {
              //     if (err) throw err;
              //     console.log('Data written to file');
              // });
            

              return res.redirect("/csvlist?tokendata="+passUrl+"&msg="+string);

        

        }

      });

  });






    var fs =  require('fs');
    var express = require('express');
    var multer = require('multer');
    var upload = multer({ dest: 'public/uploads/license'});
    app.post('/healthprovider-image-upload', upload.single('avatar'), function(req, res) {
      var _id = req.user._id;
      // console.log(_id);
      // console.log(req.files);
      var file = 'public/uploads/license/' + req.files.avatar.originalFilename;
        var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
    var User       = require('../app/models/user');
    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

         //  console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);
      fs.rename(req.files.avatar.path, file, function(err) {
        if (err) {
          // console.log(err);
          // res.send(500);
          req.flash('locals.errorhealthprovider', 'Not Uploaded!!');
          return res.redirect("/account");


        } else {
     var imageName = req.files.avatar.originalFilename;
     
     var imagepath = {};
     imagepath['originalname'] = imageName;

     var set = {licenseimg:imagepath};

         User.findById(_id, function (err, user) {
              
                 User.update(
                  { _id: _id },
                  { $set: {licenseimg:imagepath} 
               },
                  function (err, doc) {
                     console.log(doc); 
        
                  });  


     var Hpdetail = require('../app/models/hpdetail');

      Hpdetail.find(function (err, hpdetail) {
     
        var hpdetailvalue = JSON.stringify(hpdetail);
        var jsonObjecthpdetail = JSON.parse(hpdetailvalue);
   


        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

          res.render('account.ejs', { datahp : jsonObjecthpdetail, user : req.user , loadconsultdata : totalconsult, totalreadconsultstatus : finalstatusconsult, successhealthprovider: 'Image Uploaded Successfully !!'

        });

          });


      });  
      //  res.render('account.ejs', {
      //   loadconsultdata: jsonObject, user : req.user ,totalreadconsultstatus : finalstatusconsult,
      // });

    
      });


        }

      });
   

//    app.get('/account', function (req, res) {
//    // console.log("logggg");
//    res.sendFile( "public/uploads/license/" + "/" + "account" );
// });


  // return res.redirect("/account");
    

  });



  
   });


    app.get('/stockqantity', isLoggedIn, function(req, res) {
   
    var i = 0;
      var vm = this;
        vm.order = null;
        vm.allorders = [];
        vm.user = null;
        vm.allusers = [];
        vm.website = null;
        vm.allwebsites = [];
        vm.purchasedata = null;
        vm.allpurchase = [];
        vm.salesitem = null;
        vm.allsalesitem = [];
        vm.purchaseitem = null;
        vm.allpurchaseitem = [];
        vm.salesitemreturn = null;
        vm.allsalesitemreturn = [];

        var PurchaseItem = require('../app/models/purchaseItem');
        var Order = require('../app/models/orders');
        var User = require('../app/models/user');
        var Website = require('../app/models/website');
        var SalesItem  = require('../app/models/salesItem');
        var PurchaseItemReturn = require('../app/models/purchaseItemreturn');
        var SalesItemReturn = require('../app/models/salesItemreturn');

        SalesItem.find({"part" : req.query.id}, function (err, salesitem) {
       
          for(var i = 0; i < salesitem.length; i++){
              vm.allsalesitem[i] = salesitem[i];

          }
 
        var salesitemvalue = JSON.stringify(salesitem);            
        var jsonObjectsalesitem = JSON.parse(salesitemvalue);

        console.log("jsonObjectsalesitem " + jsonObjectsalesitem);

        PurchaseItem.find({"part" : req.query.id}, function (err, purchasedata) {

          console.log('purchasedata ' + purchasedata);

          for(var i = 0; i < purchasedata.length; i++){
              vm.allpurchase[i] = purchasedata[i];
          }

        var uservalue = JSON.stringify(purchasedata);
        var jsonpurchase = JSON.parse(uservalue);

        console.log("jsonpurchase " + jsonpurchase);
   
        User.find(function (err, user) {
   
          for(var i = 0; i < user.length; i++){
              vm.allusers[i] = user[i];
          }

        var uservalue = JSON.stringify(user);
        var jsonObjectuser = JSON.parse(uservalue);

        Website.find(function (err, website) {

          for(var i = 0; i < website.length; i++){
             vm.allwebsites[i] = website[i];
       
          }

          var productvaluewebsite = JSON.stringify(website);
          var jsonObjectwebsite = JSON.parse(productvaluewebsite);

        PurchaseItemReturn.find({"part" : req.query.id}, function (err, purchaseitem) {
       
          for(var i = 0; i < purchaseitem.length; i++){
              vm.allpurchaseitem[i] = purchaseitem[i];
 
            }
 
        var purchaseitemvalue = JSON.stringify(purchaseitem);
        var jsonObjectpurchaseitem = JSON.parse(purchaseitemvalue);

        SalesItemReturn.find({"part" : req.query.id}, function (err, salesitemreturn) {
     
          for(var i = 0; i < salesitemreturn.length; i++){
              vm.allsalesitemreturn[i] = salesitemreturn[i];

          }
   
          var salesitemvalue = JSON.stringify(salesitemreturn);            
          var salesReturn = JSON.parse(salesitemvalue);

        console.log('salesReturn ' + salesReturn);

      res.render('stockqantity.ejs', { salesReturndata : salesReturn ,purchaseReturn : jsonObjectpurchaseitem, jsonsales : jsonObjectsalesitem, jsonpurchasedata : jsonpurchase , namee : req.query.name, datauser: jsonObjectuser, loadwebsitedata : jsonObjectwebsite , user : req.user, partid : req.query.id});

              });

            });    

          });

        });

      });

    });
     
  });


	app.get('/about-worldex', function(req, res) {
		res.render('about-worldex.ejs', {
		});
	});

  app.get('/symptomstep', function(req, res) {
     var Product       = require('../app/models/products');
     var User          = require('../app/models/user');
    res.render('symptomstep.ejs', {
    });
  });


    app.get('/symptomsteps', isLoggedIn, function(req, res) {
       var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

     Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('symptomsteps.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

      });
   
  });


  app.post('/symptomsapi', function(req, res) {
     var Product       = require('../app/models/products');
     var User          = require('../app/models/user');
     var Addsymptoms       = require('../app/models/addsymptom');

var Addsymptomsfemales       = require('../app/models/addsymptomfemale');
      var docs= [];
  var docs1= [];  
   var idss= [];
   var product = null;
   var allProducts=[];
   var gender =req.body.gender;
  var symptomname =req.body.alltext;
  //console.log(symptomname);
  
  //var finalymptomname = symptomname.split(',');
  //console.log(finalymptomname);
  var symptomfemale =req.body.alltext;
 // console.log(symptomfemale);
  //var finalsymptomfemale = symptomfemale.split(',');
 
  var newdata=[];
  var ids= []; 

  if(gender === 'male'){

    var ress = symptomname.split(",");
   // console.log(ress);
   
      Addsymptoms.find({symptomname: { $in: ress } },function (err, docs){

       Product.find({},function(err,product){

             //console.log(product);
        

        var productvaluess = JSON.stringify(product);
       var jsonObjectproducts = JSON.parse(productvaluess);
    
    ids.push(docs); 

   // console.log(docs);

      var symptomvalue = JSON.stringify(docs);
       var jsonObjects = JSON.parse(symptomvalue);

  
    if (err) {
      res.send({ status :500, error: "Failed to get all medicines"});
    } else {     
  
   //  res.send({ status:200 , jsonObjects , jsonObjectproducts});

      res.send({datasymptom:jsonObjects, dataproduct:jsonObjectproducts});

    }
  }); 

  }); 

  } else {

     var resfemale = symptomfemale.split(",");

    console.log(resfemale);

    Addsymptomsfemales.find({symptomfemale:{ $in: resfemale }},function(err,docss){

        Product.find({},function(err,product){

             console.log(product);
        

        var productvaluess = JSON.stringify(product);
       var jsonObjectproducts = JSON.parse(productvaluess);
  
    newdata.push(docss); 

    console.log(docss);

       var symptomvalues = JSON.stringify(docss);
        var jsonObjectss = JSON.parse(symptomvalues);

    if (err) {
      res.send({ status :500, error: "Failed to get all medicines"});
    } else {     
   
  //   res.send({ status:200 , jsonObjectss , jsonObjectproducts });

     res.send({datasymptoms:jsonObjectss, dataproducts:jsonObjectproducts});

  // res.render('symptomstep',{ newjson1 : jsonObjectss});
 
    }
  });
    });     
  }  
  
  });


  app.get('/about-worldexs',isLoggedIn, function(req, res) {
      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

     Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('about-worldexs.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

      });
  
  });

    app.post('/card-save',isLoggedIn, function(req, res) {
    var User       = require('../app/models/user');

    var stripe = require("stripe")("sk_test_beRNx3hBDckaj2C0eLZYgrqP");
      
    var token = req.body.stripeToken; // Using Express
    var email = req.body.stripeEmail;
    var total = "60";
     //console.log("I am Loggedin User");

     var customer = stripe.customers.create({
     //  amount: total,
     // currency: "usd",
      email: email,
      source: token,

        }).then(function(customer) {
        console.log(customer.id);
      //console.log(req.body.userid);
      var _id = req.body.userid;
         User.findById(_id, function (err, user) {
            //console.log(user);
           //console.log(user.stripeChargeCustomerId);

            if(!user.stripeChargeCustomerId){
              //  console.log(user._id);
              User.update(
                { _id: user._id },
                { $set: {stripeChargeCustomerId:customer.id,customerData: customer.sources.data,} },
                function (err, docsss) {
                     console.log(docsss);              
                });  

              };
            });

        }); 

   return res.redirect('/subscription');

  });


	 app.get('/subscription',isLoggedIn, function(req, res) {
      var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
    var User       = require('../app/models/user');   
    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

          // console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('subscription.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

       });


      });
  
  
  });

  app.post('/subscribe',isLoggedIn, function(req, res) {
    var UserSubscription       = require('../app/models/usersubscription');
    var User       = require('../app/models/user');
    var stripe = require("stripe")("sk_test_beRNx3hBDckaj2C0eLZYgrqP");
    var token = req.body.stripeToken;
    var stripeCustomerId = req.body.stripeChargeCustomerId;
    var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
    var User       = require('../app/models/user');   
    var Consult       = require('../app/models/consults');
    // var flash = require('express-flash-messages')
    // app.use(flash())
    //console.log(stripeCustomerId);
    var sub=req.body.sub;
    //console.log(sub);
    var unsub=req.body.unsub;
  //  console.log(unsub);


     if(sub == 'Subscribe'){

     //console.log("hiii i am subscribe");
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;

   Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

          // console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);

       

    var plan = stripe.plans.create({
      amount: 0,
      interval: "month",
      name: "Free Plan",
      currency: "usd",
      id: "Free Plan"
    }, function(err, plan) {
      // asynchronously called
      //var payment = JSON.stringify(plan);
     // console.log(plan);

      });

    var subscription =  stripe.subscriptions.create({ 
      customer: stripeCustomerId,
      items: [
        {
          plan: "Free Plan",
        },
      ]
    }, function(err, subscription) {
      
       // console.log(subscription);
      // asynchronously called
        var _id=req.body.userid;
        //console.log(_id);
        var dates=  new Date();
        var sets = {subscriptionid: subscription.id,userid : _id,customerid:stripeCustomerId,subscriptionplan:subscription.plan,subscriptionstatus:subscription.status,subscriptioncreate:subscription.created,subscriptionstart:subscription.current_period_start,subscriptionend:subscription.current_period_end,subscriptionitem:subscription.items.data,};
        var usersubscription = new UserSubscription(sets);
        usersubscription.save(function(error, dataconsult){
            if(error){
                res.json(error);
            }
            else{
            //  console.log(dataconsult); 
              var subiidd = dataconsult.subscriptionid;
            //  console.log(dataconsult.subscriptionid);
              console.log(_id);
               User.findById(_id, function (err, user) {
              
                 User.update(
                  { _id: _id },
                  { $set: {subscriptionId:subiidd,subscriptionname:"Free Plan",} 
               },
                  function (err, doc) {
                    // console.log(doc); 
        
                  });  
            });   
 
          }
      });


    });

    //});
    // req.flash('info','Subscribed!!!')
       // return res.redirect('subscription', { successub: 'Subscribed!!!' });
     return res.render('subscription.ejs', {user : req.user,totalreadconsultstatus : finalstatusconsult, successub: 'Subscribed!!!' });

       // res.redirect('/subscription');
   });
     } 
     if(sub != 'Subscribe')
     {
    console.log("hiii i am unsubscribe");
     var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;

   Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

          // console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);

        
        var dates=  new Date();
        var _id = req.body.userid;
         User.findById(_id, function (err, user) {
           console.log(user.subscriptionId);  
            var subids = user.subscriptionId;
              var confirmation = stripe.subscriptions.del(subids, function(err, confirmation) {
        // asynchronously called
                    console.log(confirmation);

                     var sets = {
                      subscriptionid: subids,
                      userid : _id,
                      customerid:stripeCustomerId,
                      subscriptionplan:confirmation.plan,
                      subscriptionstatus:confirmation.status,
                      subscriptioncreate:confirmation.create,
                      subscriptionstart:confirmation.current_period_start,
                      subscriptionend:confirmation.current_period_end,
                      subscriptionitem:confirmation.items,
                    };
                  var usersubscription = new UserSubscription(sets);
              usersubscription.save(function(err, doc){  
                    var _id = req.body.userid;
                       User.update(
                      { _id: _id },
                      { $set: {subscriptionId:"",subscriptionname:"Not Active",} 
                   },
                      function (err, doc) {
                         console.log(doc); 
                   }); 
                   
                    }); 

              }); 
            }); 
     return res.render('subscription.ejs', {user : req.user, totalreadconsultstatus : finalstatusconsult, errorsub: 'Unsubscribed!!!' });
             
             // req.flash('info','UnSubscribed!!!')
       // return res.redirect('subscription', { successub: 'Subscribed!!!' });
       // res.redirect('/subscription');

      // return res.redirect('subscription', { errorsub: 'Unsubscribed!!!' });

            // return res.redirect('/subscription');
});

     }    

       // return res.redirect('/subscription');
    //  res.render('subscription.ejs',  {

    //  user : req.user
    // });

  });
	app.get('/health-provider', function(req, res) {
		res.render('health-provider.ejs', {
		});
	});

   app.post('/health-provider', function(req, res) {
   
   return res.redirect('/');
  });

	app.get('/download-app', function(req, res) {
		res.render('download-app.ejs', {
		});
	});

  app.get('/download-apps',isLoggedIn, function(req, res) {
    var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('download-apps.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

        });

      });
    
  });


	app.get('/checkout', function(req, res) {
		res.render('checkout.ejs', {
		});
	});

	app.get('/checkouts',isLoggedIn, function(req, res) {
	
     var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
          console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('checkouts.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      
       });

      });
    
	});


// //////////////////////thankuguest///////////////////
app.get('/thankyou', function(req, res) {
  // console.log(req.query.orderid);
  var Order   = require('../app/models/orders');
     res.render('thankyou.ejs', {
		});
	
	});


///////////////////////////////////////////////////////////

    app.get('/mailorder-detail', function(req, res) {

      var orderid = req.query.id;


      console.log(orderid);

        var i = 0;
        var vm = this;
        vm.order = null;
        vm.allorders = [];
        vm.orderiem = null;
        vm.allorderitem = [];
        vm.user = null;
        vm.allusers = [];

    var Order       = require('../app/models/orders');
    var Orderitem   = require('../app/models/orderitem');
    var User       = require('../app/models/user');

     User.find(function (err, user) {
      // docs is an array
        for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);


   
      Order.find(function (err, order) {
      // docs is an array
        for(var i = 0; i < order.length; i++){
            vm.allorders[i] = order[i];


        }
 
       var productvalue = JSON.stringify(order);
       var jsonObject = JSON.parse(productvalue);



      Orderitem.find(function (err, orderitem) {
      // docs is an array
        for(var i = 0; i < orderitem.length; i++){
            vm.allorderitem[i] = orderitem[i];


        }

        // console.log(orderitem);
 
       var productvalueitem = JSON.stringify(orderitem);
       var jsonObjectitem = JSON.parse(productvalueitem);
   
      res.render('mailorder-detail.ejs', {data: jsonObject, datauser: jsonObjectuser, dataitem : jsonObjectitem, orderid : req.query.id});

      });

  });

    });   

   });

  //////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////

    app.get('/registerstep', function(req, res) {

      var emailid = req.query.email;

       var tokenId = req.query.token;


      console.log(emailid);

        var i = 0;
        var vm = this;
        vm.order = null;
        vm.allorders = [];
        vm.orderiem = null;
        vm.allorderitem = [];
        vm.user = null;
        vm.allusers = [];

    var Order       = require('../app/models/orders');
    var Orderitem   = require('../app/models/orderitem');
    var User       = require('../app/models/user');

     User.find({"local.email" : emailid},function (err, user) {
      // docs is an array
        for(var i = 0; i < user.length; i++){
            vm.allusers[i] = user[i];


        }
 
       var uservalue = JSON.stringify(user);
       var jsonObjectuser = JSON.parse(uservalue);

   
      res.render('registerstep.ejs', { datauser: jsonObjectuser, emailid : req.query.email , tokenId : req.query.token});


    });   

   });

  //////////////////////////////////////////////////////////////

	app.get('/paypal_thankyou',isLoggedIn, function(req, res) {
   var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];

    var Consult       = require('../app/models/consults');
        var readstatuscount = 0; 
        var answerstatuscount = 0;  
        var totalreadconsultstatus = 0 ;
     
       Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;
                }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
         // console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

        Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        res.render('paypal_thankyou.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult,});

      });

     });    
    
	
	});

	app.get('/charge_thanks',isLoggedIn, function(req, res) {
	  var i = 0;
       var vm = this;
        vm.consult = null;
        vm.allconsults = [];
         var readstatuscount = 0; 
        var totalreadconsultstatus = 0

      var Consult       = require('../app/models/consults');


     Consult.find(function (err, consult) {
        // docs is an array
          for(var i = 0; i < consult.length; i++){
              vm.allconsults[i] = consult[i];

              if(req.user.user_role == 'user'){

                if(req.user._id == consult[i].user_id){

                      var totalreadstatusc = consult[i].read_status;

                      //console.log(totalreadstatusc);

                      if(totalreadstatusc != '1')
                         {
                        readstatuscount += 1;

                      
                         }
                    }


              }

          }

           //console.log(readstatuscount);       

          var finalstatusconsult = readstatuscount ;
        //  console.log(finalstatusconsult);
         var productvalue = JSON.stringify(consult);
         var jsonObject = JSON.parse(productvalue);

       Consult.find({'doctor_read_status': '0'},function (err, totalconsult) {

     
        // res.render('account.ejs', {loadconsultdata: jsonObject, user : req.user ,totalreadconsultstatus : finalstatusconsult,});
        // res.render('peo-comprofiles.ejs', {loadconsultdata: jsonObject, user : req.user,totalreadconsultstatus : finalstatusconsult});
         res.render('charge_thanks.ejs', {loadconsultdata: totalconsult, user : req.user ,totalreadconsultstatus : finalstatusconsult});
      });

      });  
	
	});

	app.post('/checkout-function', function(req, res) {
    console.log("checkout calling");
    console.log(res);
		var Order       = require('../app/models/orders');
		var Orderitem       = require('../app/models/orderitem');
		var paypal = require('paypal-rest-sdk');
		require('paypal-rest-sdk/lib/configure');
		var newvalue = 0;
		 var paypalCredentials = {
		    "host" : "api.sandbox.paypal.com",
		    "port" : "",
		    "client_id" : "AdZno8uEIOj5xWLclvf1qHzvt1Z89xz5mcGgx3yvD1_iLjxT5FgrgrjNEkqQBuch5ySuoobEapBSQine",
		    "client_secret" : "EEEfwiEQm0tgfy9RL6PlkohrL82izgdjrdCuzAujXtHTO-03J3lhLch1pwsDit1N-8h9bWFQYx4J9TO6"
		};
		paypal.configure(paypalCredentials);


		var cartarray = req.body.cartvalue;
		//console.log(cartarray);
		var jsonObject = JSON.parse(cartarray);
		var userid =  req.body.userid;
		var dates=  new Date();
		var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

        var set = {    
                userid : req.body.userid,
               shipfname: req.body.shipfname,
               shiplname: req.body.shiplname,
               autocomplete: req.body.shipaddress,
               postal_code: req.body.postal_code,
               locality: req.body.locality,
               administrative_area_level_1: req.body.administrative_area_level_1,
               country: req.body.country,
               shipphone: req.body.shipphone,
               shipemail: req.body.shipemail,
               shipc_email: req.body.shipc_email,
               billfname: req.body.billfname,
               billname: req.body.billname,
               billemail: req.body.billemail,
               billaddress: req.body.billaddress,
               billcity: req.body.billcity,
               billstate: req.body.billstate,
               billstate1: req.body.billstate1,
               billcountry: req.body.billcountry,
               billcountry1: req.body.billcountry1,
               billcode: req.body.billcode,
               cardname: req.body.cardname,
               cardno: req.body.cardno,
               cvvno: req.body.cvvno,
               exp_month: req.body.exp_month,
               exp_days: req.body.exp_days,
               // cardname: "visa",
               // cardno: "4242-4242-4242-4242",
               // cvvno: "123",
               // exp_month: "12",
               // exp_days: "21",
               hdnCartTotal : req.body.hdnCartTotal,               
               stateTax : req.body.stateTax,
               shippingAmtt : "3.99",
               o_status :"Pending",
               payment_method: "Paypal",
               datetime: strDate
        };	



		 	var orders = new Order(set);

			orders.save(function(error, data){
			    if(error){
			        res.json(error);
			    }
			    else{
			    	
			 
			       var objectId = data._id; // this will return the id of object inserted
					//console.log(objectId);
					 newvalue = objectId;   


				Order.findOne({'_id': newvalue},function(err,docs){
			//	console.log(docs);	
				var i = 0;
				var _id=docs._id;
				var shipfname =docs.shipfname;
				var autocomplete =docs.autocomplete;
				var postal_code = docs.postal_code ;
				var locality = docs.locality ;
				var country = "US" ;
				var administrative_area_level_1 = docs.administrative_area_level_1 ;
				var country = docs.country ;
				var shipphone = docs.shipphone ;
				
				var finalval= newvalue;

				//console.log(docs);

				var jsonObject = JSON.parse(cartarray);
			//	console.log(jsonObject.length);
				//console.log(jsonObject);

				var total = 0 ;
				         for(var i = 0; i < jsonObject.length; i++){
				      
				//console.log(jsonObject[0].Product);
				 var total = total + (jsonObject[i].Price * jsonObject[i].Qty);
				// console.log(total);
				 var sets = {    
				                orderid : finalval,
                        productid: jsonObject[i].ProductIds,
                        productstocks : jsonObject[i].ProductStocks,
				                productname: jsonObject[i].Product,
				                productprice: jsonObject[i].Price,
				                productqty: jsonObject[i].Qty ,
				                datetime: strDate
				               // totalprice: "1",
				               // grandtotalprice: "1" 
				              
				            };

				var orderitem = new Orderitem(sets);
				 
				orderitem.save(function(error, datas){
			    if(error){
			        res.json(error);
			    }
			    else{
			   // 	console.log(datas);
			    	//res.json(datas);
			     }

			    });




			//	 return res.redirect('app/#/index' );





				}


			     if(userid == "guest"){


				 console.log("guest checkout");



				  var create_payment_json = {
				    "intent": "sale",
				    "redirect_urls": {
				     "return_url": "https://greenliving.io/paypal_loginbefore_update",
				     "cancel_url": "https://greenliving.io/checkout"
			   	     // "return_url": "http://localhost:5555/paypal_loginbefore_update",
				        //  "cancel_url": "http://localhost:5555/checkout"
				    },
				    "payer": {
				        "payment_method": "paypal",
				        "payer_info": {
				            "tax_id_type": "BR_CPF",
				            "tax_id": "Fh618775690"
				        }
				    },
				    "transactions": [
				        {
				            "amount": {
				                "total": total,
				                "currency": "USD"
				                
				            },
				            "description": "This is the payment transaction description.",
				            "custom": "EBAY_EMS_90048630024435",
				            "invoice_number": "48787589677",
				            "payment_options": {
				                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
				            },
				            "soft_descriptor": "ECHI5786786",
				            "item_list": {                      
		                // "shipping_address": {
		                //    // "recipient_name": shipfname,
		                //     // "line1": autocomplete,
		                //     // "city": locality,
		                //   //  "country_code": country,
		                //    // "postal_code": postal_code,
		                //     //"phone": shipphone,
		                //   //  "state": administrative_area_level_1
		                // }      				           
                  }
				        }
				    ]
				};

  
  app.get('/paypal_loginbefore_update', function(req, res) {
    
      var totalquantity = [];       			
        var i = 0;
    var vm = this;
        vm.orderitem = null;
        vm.allorderitems = [];
        productqtt =[];
        quantityuse = [];
        remainquanty = [];

      var Order   = require('../app/models/orders');
      var Orderitem   = require('../app/models/orderitem');
      var Product   = require('../app/models/products');

            var _id = newvalue;
                 Order.findById(_id,function (err, order) {
                    console.log(order._id);
                     console.log(order.shipemail);
                  //console.log(user.stripeChargeCustomerId);
                      Order.update(
                        { _id:_id },
                        { $set: {paymentId: req.query.paymentId,token : req.query.token,PayerID :req.query.PayerID,o_status :"Done" } },
                        function (err, doc) {
                         // console.log(doc);              
                        });  

                    var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                    var to = [order.shipemail]
                    var from = 'health@greenliving.io'

                        ses.sendEmail( 
                          { 
                            Source: from, 
                            Destination: { ToAddresses: to },
                            Message: {
                              Subject: {
                                Data: 'Order Confirmation'
                              },
                              Body: {
                                Html: {
                                Data: "<b>"+ "<p>Thanks For Ordering.........</p><p>Take a look on your order details :- <p> <a href='https://greenliving.io/mailorder-detail?id="+order._id+"'>Click Here</a>" +"</b>" // html body',
                                }
                              }
                            }                          
                          }).promise();


                        Orderitem.find({"orderid" : _id},function (err, orderitem) {

                             // console.log(orderitem.length)

                             for(var i = 0; i < orderitem.length; i++){
                             vm.allorderitems[i] = orderitem[i];

                            

                           // Product.findById({"_id" : vm.allorderitems[i].productid},function (err, product) {
                           //      // console.log(product);

                           //      if(product.total_stock == vm.allorderitems[i].productstocks){

                           //        console.log("true");

                           //      }else{

                           //         console.log("false");

                           //      }
                            
                           //   });    

                           //   console.log(newtotalquantity);
                              totalquantity[i] =  vm.allorderitems[i].productstocks;
                                quantityuse[i] =  vm.allorderitems[i].productqty;
                                // console.log("Deduct Qunaity" + quantityuse);
                              
                               remainquanty[i] = totalquantity[i] - quantityuse[i]; 

                                console.log(remainquanty[i]);

                              Product.update(
                                { _id: vm.allorderitems[i].productid },
                                { $set: {total_stock: remainquanty[i] } },
                                function (err, doc) {
                                  console.log(doc);              
                                });

                              // Orderitem.update(
                              //   { _id: vm.allorderitems[i].productid },
                              //   { $set: {productstocks: remainquanty[i] } },
                              //   function (err, docs) {
                              //     console.log(docs);              
                              //   });

                              }


                           });

                    });


            // return res.redirect('/thankyou?orderid='+ _id);

				     return res.redirect('/thankyou');   	 
                 
            });

     

				} 


        else


        {

				console.log("paypal");
				var create_payment_json = {
				    "intent": "sale",
				    "redirect_urls": {
				     "return_url": "https://greenliving.io/paypal_update",
				     "cancel_url": "https://greenliving.io/checkouts"
				   // "return_url": "http://localhost:5555/paypal_update",
				    // "cancel_url": "http://localhost:5555/checkouts"
				    },
				    "payer": {
				        "payment_method": "paypal",
				        "payer_info": {
				            "tax_id_type": "BR_CPF",
				            "tax_id": "Fh618775690"
				        }
				    },
				    "transactions": [
				        {
				            "amount": {
				                "total": total,
				                "currency": "USD"
				                
				            },
				            "description": "This is the payment transaction description.",
				            "custom": "EBAY_EMS_90048630024435",
				            "invoice_number": "48787589677",
				            "payment_options": {
				                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
				            },
				            "soft_descriptor": "ECHI5786786",
				            "item_list": {
				                
				                // "shipping_address": {
				                 
                    //         "recipient_name": shipfname,
                    //         "line1": shipaddress,
                    //         "city": shipcity,
                    //         "country_code": shipcountry,
                    //         "postal_code": shippcode,
                    //         "phone": shipphone,
                    //         "state": shipstate		
                    //    }     		          
				            }
				        }
				    ]
				};

/////////////////////////////////mmail////////////////////////////////////////////////////////////////
  app.get('/paypal_update', function(req, res) {
               var totalquantity = [];            
        var i = 0;
    var vm = this;
        vm.orderitem = null;
        vm.allorderitems = [];
        productqtt =[];
        quantityuse = [];
        remainquanty = [];

      var Order   = require('../app/models/orders');
      var Orderitem   = require('../app/models/orderitem');
      var Product   = require('../app/models/products');
                var _id = newvalue;
                 Order.findById(_id, function (err, order) {
                    // console.log(user);
                  //  console.log(user.stripeChargeCustomerId);
                      Order.update(
                        { _id:_id },
                        { $set: {paymentId: req.query.paymentId,token : req.query.token,PayerID :req.query.PayerID,o_status :"Done" } },
                        function (err, doc) {
                             console.log(doc);              
                        }); 

                    var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                    var to = [order.shipemail]
                    var from = 'health@greenliving.io'

                        ses.sendEmail( 
                          { 
                            Source: from, 
                            Destination: { ToAddresses: to },
                            Message: {
                              Subject: {
                                Data: 'Order Confirmation'
                              },
                              Body: {
                                Html: {
                                Data: "<b>"+ "<p>Thanks For Ordering.........</p><p>Take a look on your order details :- <p> <a href='https://greenliving.io/mailorder-detail?id="+order._id+"'>Click Here</a>" +"</b>" // html body',
                                }
                              }
                            }
                          }).promise();

                        Orderitem.find({"orderid" : _id},function (err, orderitem) {

                             // console.log(orderitem.length)

                             for(var i = 0; i < orderitem.length; i++){
                             vm.allorderitems[i] = orderitem[i];

                            

                           // Product.findById({"_id" : vm.allorderitems[i].productid},function (err, product) {
                           //      // console.log(product);

                           //      if(product.total_stock == vm.allorderitems[i].productstocks){

                           //        console.log("true");

                           //      }else{

                           //         console.log("false");

                           //      }
                            
                           //   });    

                           //   console.log(newtotalquantity);
                              totalquantity[i] =  vm.allorderitems[i].productstocks;
                                quantityuse[i] =  vm.allorderitems[i].productqty;
                                // console.log("Deduct Qunaity" + quantityuse);
                              
                               remainquanty[i] = totalquantity[i] - quantityuse[i]; 

                                console.log(remainquanty[i]);

                              Product.update(
                                { _id: vm.allorderitems[i].productid },
                                { $set: {total_stock: remainquanty[i] } },
                                function (err, doc) {
                                  console.log(doc);              
                                });

                              // Orderitem.update(
                              //   { _id: vm.allorderitems[i].productid },
                              //   { $set: {productstocks: remainquanty[i] } },
                              //   function (err, docs) {
                              //     console.log(docs);              
                              //   });

                              }


                           });




                    });

              
         return res.redirect('/paypal_thankyou');

                 
          });


        }

///////////////////////////////////mmail////////////////////////////////////

				
				paypal.payment.create(create_payment_json, function (error, payment) {
				    if (error) {
				        console.log(error);
				    } else {
				      req.session.paymentId = payment.id;
				            	var _id = newvalue ;
				               	console.log(_id);
				               	console.log("order id is  " + newvalue);
				                orders.update({ '_id': newvalue },{ "$set": {  paymentId : req.session.paymentId,
											//token : req.query.token,
											//PayerID : req.query.PayerID,
											o_status : "Done"
										}},
							    function (err, raw) {
							        if (err) {
							            console.log('Error log: ' + err)
							        } else {
							            console.log("Token updated: " + raw);
							        }
							    }
							);


						//  Order.findById({ '_id': newvalue }, function (err, orderss) {
						//     orders.update({  paymentId : req.session.paymentId,
						// 					token : req.query.token,
						// 					PayerID : req.query.PayerID,
						// 					o_status : "Done"
						// 				}).exec();
						//     console.log(orderss);
						// });
	

				             
				       var redirectUrl;
				        for (var index = 0; index < payment.links.length; index++) {
				        //Redirect user to this endpoint for redirect url
				            if (payment.links[index].rel === 'approval_url') {

				            	 console.log(payment.links[index].href);	

				            	  res.redirect(payment.links[index].href);   

				            }

				        }
				    }
				});

				


				exports.execute = function(req, res){
				console.log(res);
				var payerId = req.param('PayerID');
				console.log(payerId);
				var execute_payment_json = {
				    "payer_id": payerId,
				    "transactions": [{
				        "amount": {
				            "currency": "USD",
				            "total": total
				        }
				    }]
				};

				var paymentId = req.session.paymentId;

				paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
				    if (error) {
				        console.log(error);
				    } else {
				        console.log("Get Payment Response");
				        console.log(JSON.stringify(payment));

				    }
				});
				};



				exports.cancel = function(req, res){
				  res.send("The payment got canceled");
				};

			});

			}

			 
          

			});
			});

				


 app.post('/reorder', function(req, res) {

   //console.log(res);
    var Order       = require('../app/models/orders');
    var Orderitem       = require('../app/models/orderitem');
    var newvalue = 0;
    var cartarray = req.body.cartvalue;

    var userid =  req.body.userid;
    var total = req.body.hdnCartTotals;

    var order_id = req.body.order_id;
    var date_time = req.body.date_time;
    var shipping_address = req.body.shipping_address;
    var payment_status = req.body.payment_status;
  //  var quantity = req.body.quantity;

    var datasneww = [];

    Order.findOne({'_id': order_id},function(err,docs){

     // console.log(docs);

      var set = {    
                userid : docs.userid,
               shipfname: docs.shipfname,
               shiplname: docs.shiplname,
               shipping_address : shipping_address,
               autocomplete: docs.autocomplete,
               postal_code: docs.postal_code,
               locality: docs.locality,
               administrative_area_level_1: docs.administrative_area_level_1,
               country: docs.country,
               shipphone: docs.shipphone,
               shipemail: docs.shipemail,
               shipc_email: docs.shipc_email,
               billfname: docs.billfname,
               billname: docs.billname,
               billemail: docs.billemail,
               billaddress: docs.billaddress,
               billcity: docs.billcity,
               billstate: docs.billstate,
               billstate1: docs.billstate1,
               billcountry: docs.billcountry,
               billcountry1: docs.billcountry1,
               billcode: docs.billcode,
               // cardname: docs.cardname,
               // cardno: docs.cardno,
               // cvvno: docs.cvvno,
               // exp_month: docs.exp_month,
               // exp_days: docs.exp_days,
               cardname: "visa",
               cardno: "4242-4242-4242-4242",
               cvvno: "123",
               exp_month: "12",
               exp_days: "21",
               hdnCartTotal : docs.hdnCartTotal,
               o_status :"Pending",
               payment_method: "Card",
               datetime: req.body.date_time,
               payment_status: "Pending"

        };  


      var orders = new Order(set);

       orders.save(function(error, data){
          if(error){
              //res.json(error);
          }
          else{ 
             // res.send(data);

        var objectId = data._id; // this will return the id of object inserted
           newvalue = objectId;   

        Order.findOne({'_id': newvalue},function(err,docs){
        var i = 0;
        var _id=docs._id;
        var shipfname =docs.shipfname;
        var autocomplete =docs.autocomplete;
        var shipping_address =docs.shipping_address;
        var postal_code = docs.postal_code ;
        var locality = docs.locality ;
        var country = "US" ;
        var administrative_area_level_1 = docs.administrative_area_level_1 ;
        var country = docs.country ;
        var shipphone = docs.shipphone ;
        var finalval= newvalue;
       // var jsonObject = JSON.parse(cartarray);
        var total = 0 ;
                 for(var i = 0; i < cartarray.length; i++){
              
         var total = total + (cartarray[i].Price * cartarray[i].Qty);
         var sets = {    
                        orderid : finalval,
                        productname: cartarray[i].Product,
                        productprice: cartarray[i].Price,
                        productqty: cartarray[i].Qty ,
                        datetime: req.body.date_time                   
                    };

        var orderitem = new Orderitem(sets);
 
        orderitem.save(function(error, datas)
        {
          if(error){
             // res.json(error);
             // res.status(500).json(error);

          }
          else{ 

            if(i = 0){
                 datasneww = datas;
            }
            else{
               datasneww += datas;
            }

           
           // console.log(datasneww);

          
          }

        });
       
       }
          });
      
     res.status(200).json({order_id : newvalue});
     
     }
       

        });



    });
 
 });


  // app.post('/reorder', function(req, res) {

  //   var Order       = require('../app/models/orders');
  //   var Orderitem       = require('../app/models/orderitem');
  //   var Transactions       = require('../app/models/transaction');
  //   var User       = require('../app/models/user');
  //   var newvalue = 0;
  //   var cartarray = req.body.cartvalue;
  //   var order_id = req.body.order_id;
  //   var date_time = req.body.date_time;
  //   var shipping_address = req.body.shipping_address;
  //   var payment_status = req.body.payment_status;
  //   var total = req.body.hdnCartTotals;
  //   var userid = req.body.userid;
  //   console.log(userid);
  //   var datasneww = [];
  //    Order.findOne({'_id': order_id},function(err,docs){

  //     //console.log(docs);

  //     var set = {    
  //               userid : docs.userid,
  //              shipfname: docs.shipfname,
  //              shiplname: docs.shiplname,
  //              shipping_address : shipping_address,
  //              autocomplete: docs.autocomplete,
  //              postal_code: docs.postal_code,
  //              locality: docs.locality,
  //              administrative_area_level_1: docs.administrative_area_level_1,
  //              country: docs.country,
  //              shipphone: docs.shipphone,
  //              shipemail: docs.shipemail,
  //              shipc_email: docs.shipc_email,
  //              billfname: docs.billfname,
  //              billname: docs.billname,
  //              billemail: docs.billemail,
  //              billaddress: docs.billaddress,
  //              billcity: docs.billcity,
  //              billstate: docs.billstate,
  //              billstate1: docs.billstate1,
  //              billcountry: docs.billcountry,
  //              billcountry1: docs.billcountry1,
  //              billcode: docs.billcode,
  //              cardname: docs.cardname,
  //              cardno: docs.cardno,
  //              cvvno: docs.cvvno,
  //              exp_month: docs.exp_month,
  //              exp_days: docs.exp_days,
  //              hdnCartTotal : docs.hdnCartTotal,
  //              o_status :"Pending",
  //              payment_method: "Card",
  //              datetime: req.body.date_time,
  //              payment_status: "Pending"

  //       };  


  //     var orders = new Order(set);

  //      orders.save(function(error, data){
  //         if(error){
  //             res.json(error);
  //         }
  //         else{ 
  //            // res.send(data);

  //       var objectId = data._id; // this will return the id of object inserted
  //          newvalue = objectId;   

  //       Order.findOne({'_id': newvalue},function(err,docs){
  //       var i = 0;
  //       var _id=docs._id;
  //       var shipfname =docs.shipfname;
  //       var autocomplete =docs.autocomplete;
  //       var shipping_address =docs.shipping_address;
  //       var postal_code = docs.postal_code ;
  //       var locality = docs.locality ;
  //       var country = "US" ;
  //       var administrative_area_level_1 = docs.administrative_area_level_1 ;
  //       var country = docs.country ;
  //       var shipphone = docs.shipphone ;
  //       var finalval= newvalue;
  //      // var jsonObject = JSON.parse(cartarray);
  //       var total = 0 ;
  //                for(var i = 0; i < cartarray.length; i++){
              
  //        var total = total + (cartarray[i].Price * cartarray[i].Qty);
  //        var sets = {    
  //                       orderid : finalval,
  //                       productname: cartarray[i].Product,
  //                       productprice: cartarray[i].Price,
  //                       productqty: cartarray[i].Qty ,
  //                       datetime: req.body.date_time                   
  //                   };

  //       var orderitem = new Orderitem(sets);
 
  //       orderitem.save(function(error, datas)
  //       {
  //         if(error){
  //              res.status(500).json(error);
  //         }
  //         else{ 
  //           if(i = 0){
  //                datasneww = datas;
  //           }
  //           else{
  //              datasneww += datas;
  //           }

  //           res.status(200).json({orderdetail : data , orederitemdetail: datas});
  //         }

  //       });
       
  //      }
  

  //     });


  //     }

  // });

  // });

  // });


app.post('/payment', function(req, res) {
  //  console.log(res);
    var Order       = require('../app/models/orders');
    var Orderitem       = require('../app/models/orderitem');
    var Transactions       = require('../app/models/transaction');
    var User       = require('../app/models/user');
  
     var dates=  new Date();
      var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();

      var stripe = require("stripe")("sk_test_beRNx3hBDckaj2C0eLZYgrqP");
      //console.log(req);
      // Token is created using Stripe.js or Checkout!
      // Get the payment token ID submitted by the form:
      var token = req.body.stripeToken; // Using Express
      //console.log(token);
      var userid = req.body.userid;
      var order_id = req.body.order_id;
      var total = req.body.amount;
     // var email = req.body.stripeEmail;
      
       User.findOne({'_id':userid}, function (err, user) {      
      
       stripe.customers.create({
        email: user.local.email,
        source: token,
      }).then(function(customer) {

         console.log(customer);
              
        return stripe.charges.create({
                amount: total*100,
                currency: "usd",
                customer: customer.id,
              });

          }).then(function(charge) {

            console.log(charge);
           var _id=req.body.userid;
            var set = {    
                      userid : _id,
                      orderid : req.body.order_id,
                      paymentId: charge.id,
                      amount: charge.amount,
                      balance_transaction: charge.balance_transaction, 
                      created: charge.created, 
                      paid_status: charge.paid,
                      sourceId: charge.source.id, 
                      sourceObject: charge.source.object,
                      sourceBrand: charge.source.brand,
                      sourceCountry: charge.source.country,
                      sourceExpMonth: charge.source.exp_month, 
                      sourceExpYears: charge.source.exp_year, 
                      sourceFingerprint: charge.source.fingerprint, 
                      sourceFunding: charge.source.funding, 
                      sourceLast4: charge.source.last4,
                      sourceName: charge.source.name, 
                      datetime: strDate
                  };



          var transaction = new Transactions(set);
         
      

        transaction.save(function(error, datas){
          if(error){
              res.status(500).json(error);
          }
          else{
           // console.log(datas);
            var objectId = datas._id;
            res.status(200).json({data : datas});
           }


          }); 

          Order.findOne({'_id': req.body.order_id}, function (err, order) {
              
                Order.update(
                  { _id: req.body.order_id },
                  { $set: {o_status:"Done",payment_status:"Done"}},
                  function (err, doc) {
                     console.log(doc);         
                  });  
          });    

          User.findById(_id, function (err, user) {
              
              console.log(user.stripeChargeCustomerId);

              if(!user.stripeChargeCustomerId){
                User.update(
                  { _id: _id },
                  { $set: {stripeChargeCustomerId:charge.customer} },
                  function (err, doc) {
                     console.log(doc);         
                  });  

              }else{
              }

          });
        
      });

    });  

    });
    




	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

 

 
      var fs =  require('fs');
      var express = require('express');
      var multer = require('multer');
      var uploads = multer({ dest: 'public/uploads/license/'});
      app.post('/licenseimgupload', function(req, res) {
     // console.log(req);
      var User       = require('../app/models/user');

     User.findOne({ $or: [{'local.email': req.body.email},{'google.email': req.body.email},{'facebook.email': req.body.email}]}, function(err, existingUser) {
                   // console.log(existingUser);
             
      if(!existingUser){

         var md5 = require('md5');
      var file = 'public/uploads/license/' + req.files.licenseimg.originalFilename;
     // console.log(req.files.licenseimg.path);
      var dates=  new Date();
      var strDate = (dates.getMonth()+1)+ "-" + dates.getDate() + "-" + dates.getFullYear();
      //var base64 = require('base-64');
      var Base64 = require('js-base64').Base64;

      fs.rename(req.files.licenseimg.path, file, function(err) {
        if (err) {
          console.log(file);
          //console.log(err);
             return res.redirect('/');
        } else {
          var imageName = req.files.licenseimg.originalFilename;
          var imagepath = {};
          imagepath['originalname'] = imageName;
          // var bcrypt = require('bcrypt-nodejs');
          var hash = md5(req.body.password);
         // console.log(hash);
          var setencode = {  
               user_role: req.body.user_role,
               firstName : req.body.firstName ,
               lastName : req.body.lastName,
               regsitertoken : req.body.regsitertoken,
               local: {
                 email : req.body.email,
                 password : hash, 
               },   
               licenseimg: imagepath,
               first_time_login : req.body.first_time_login         
        };  

     //console.log(setencode);
   var User       = require('../app/models/user');
    var users = new User(setencode);
    users.save(function(error, dataconsult){
          if(error){
              res.json(error);
              //console.log(error); 
          }
          else{
             // res.json(data);
            console.log(dataconsult); 
             var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                        var to = [req.body.email]
                        var from = 'health@greenliving.io'

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
                                Data: "<b>"+ "<p>Dear " +req.body.firstName+ ",<p>Thank you for your interest in joining GreenLiving. Please submit your application by clicking here <a href='https://greenliving.io/registerstep?email="+req.body.email+"&token="+req.body.regsitertoken+"'>Join Us.</a> </p> <p>Once your license is verified, you will get a 50% discount on each of your purchase.</p><p>Looking forward to working with you soon. <p> <p>Sincerely yours,</p> <p>GreenLiving Admin Team</p> "+"</b>" // html body',

                                }
                              }
                            }
                          }
                        , function(err, datas) {
                          if(err) throw err
                        //  console.log(err);  
                         // console.log('Email sent:');
                          console.log(datas);
                        });


      User.find({'user_role' : 'admin'}, function(err, usedataa) {
           for(var i = 0; i < usedataa.length; i++){
            console.log(usedataa[i].local.email);     
              var aws = require('aws-sdk');
                    aws.config.loadFromPath('newconfig.json');
                    var ses = new aws.SES({apiVersion: '2010-12-01'});
                        var to = [usedataa[i].local.email]
                        var from = 'health@greenliving.io'

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
                                Data: "<b>"+ "<p>This is a new health-provider .Please confirm his/her Identity.</p>" +"</b>" // html body',

                                }
                              }
                            }
                          }
                        , function(err, datas) {
                          if(err) throw err
                        //  console.log(err);  
                         // console.log('Email sent:');
                          console.log(datas);
                        });

           }
                   
   });   


        }


            

    });

    req.flash('locals.successregister', 'Please check your email and follow instructions');
     return res.redirect('/wrongsignup'); 
  
  }
  
   // req.flash('locals.successregister', 'Please Check your mail');
   //    return res.redirect('/wrongsignup');  
    
  });

//         app.get('/account', function (req, res) {
//    // console.log("logggg");
//    res.sendFile("public/uploads/license" + "/" + "account");
// });

 } else{

     req.flash('locals.errorregister', 'Already Registered');
      return res.redirect('/wrongsignup');  

 }

 });   


});


app.get('/orderbyId/:userid', function(req, res) {
   
   // var userid = req.body.userid;
  var Order       = require('../app/models/orders');
 

  Order.find({userid:req.params.userid}, function (err, orders){
   // console.log(err);
 

  
    if (err) {

     // res.send({ status :500, error: "Failed to get all order"});
    //  console.log(err);

    res.status(500).json({ status :500, error: "Failed to get all order"});

    } else { 
    
    // res.send({ status:200 , orders });
    // console.log(order);
    res.status(200).json({ status :200, orders});


    }


});


});

 app.get('/orderdetailbyId/:orderid', function(req, res) {
   
   // var userid = req.body.userid;
  var Order       = require('../app/models/orders');
    //var userid = req.params.userid;
  var Orderitem       = require('../app/models/orderitem');

  Orderitem.find({orderid:req.params.orderid}, function (err, orderitem){
   // console.log(err);

    console.log(orderitem);

    if (err) {

      //res.send({ status :500, error: "Failed to get all product of order"});
    //  console.log(err);

        res.status(500).json({ status :500, error: "Failed to get all product of order"});


    } else { 
    
    // res.send({ status:200 , orderitem });

     res.status(200).json({ status :200, orderitem});

    // console.log(order);

    }

  });


});






// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

    app.get('/wronglogin', function(req, res) {
      res.render('wronglogin.ejs', { message: req.flash('loginMessage') });
    });

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/wronglogin', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

      // process the login form
    app.post('/androidloginapi', function(req, res) {
    // var createHash = require('hash-generator');
    // var hashLength = 16;
    // var isValidPassword = require('is-valid-password');
  //  var bcrypt = require('bcrypt-nodejs');

   var md5 = require('md5');
   var User       = require('../app/models/user');

  
    // console.log(req.body.email);
    // console.log(req.body.password);


    // var hash1 = bcrypt.hashSync(req.body.password);
     var hash = md5(req.body.password);

         User.findOne({ $or: [{'local.email': req.body.email},{'google.email': req.body.email},{'facebook.email': req.body.email}]}, function(err, user) {

                // if there are any errors, return the error
                // console.log(user.local.password);
               

                if (!user){
                   //return done(null, false, req.flash('loginMessage', 'No user found.'));                   
                 // console.log("No User Found");
                //  res.send({status : 500 , loginMessage : "No user found."});                   
                  res.status(500).json({status : 500 , loginMessage : "No user found."});


                } else {

                  if(user.user_role === 'health-provider'){

                        if(user.first_time_login === 'True'){

                         // return done(null, false, req.flash('loginMessage', 'Admin cannot activate your account.'));
                         // res.send({loginMessage : "Admin cannot activate your account."});
                          res.status(500).json({status : 500 , loginMessage : "Admin cannot activate your account."});

                        } else {

                                if (err)
                                   // return done(null, false, req.flash('loginMessage', 'No user found.'));
                                   // res.send({status : 500 ,loginMessage : "No user found."});   
                                    res.status(500).json({status : 500 , loginMessage : "No user found."});


                                // if no user is found, return the message
                                if (!user)
                                    //return done(null, false, req.flash('loginMessage', 'No user found.'));
                                   // res.send({status : 500 ,loginMessage : "No user found."});    
                                     res.status(500).json({status : 500 , loginMessage : "No user found."});


                                if (user.local.password != hash)
                                    //return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                                  //  res.send({status : 500 ,loginMessage : "Password not Match"});   
                                // all is well, return user
                                    res.status(500).json({status : 500 , loginMessage : "Password not Match"});

                                else
                                    //return done(null, user);
                                   // res.send({status : 200 ,loginMessage : user});   
                                    res.status(200).json({status : 200 , loginMessage : user});


                        }

                    } else {

                          // if no user is found, return the message
                          if (!user)
                              //return done(null, false, req.flash('loginMessage', 'No user found.'));                   
                             // res.send({status : 500 ,loginMessage : "No user found."});   
                               res.status(500).json({status : 500 , loginMessage : "No user found."});

                          if (user.local.password != hash)
                              //return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                             // res.send({status : 500 ,loginMessage : "OOPS WORNG password"});   
                         // all is well, return user
                               res.status(500).json({status : 500 , loginMessage : "Password not Match"});

                          else
                              //return done(null, user);
                             // console.log("true");
                             //res.send({status : 200 ,loginMessage : user});   
                              res.status(200).json({status : 200 , loginMessage : user});


                    }


                }


                
             
            });
    });




    app.post('/registerfacebook', function(req, res) {
    //console.log("hiii");
      //console.log(req.body.email);
          var User       = require('../app/models/user'); 

         User.findOne({ $or: [{'local.email': req.body.email},{'google.email': req.body.email},{'facebook.email': req.body.email}]}, function(err, existingUser) {
             
           if(existingUser){

        
              //  res.send({ status : 200 , existingUser}); 

                res.status(200).json({ status :200, existingUser});


               } else {

                res.status(500).json({ status :500, error: "Sorry , User not registered..Please consult the website !!!"});

                //res.send({ status : 500 , err : 'Sorry , User not registered..Please consult the website !!!'});  

               }


           });           
   
  });  


    // SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

    app.get('/wrongsignup', function(req, res) {
      res.render('wrongsignup.ejs', { message: req.flash('signupMessage') });
    });

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/wrongsignup', // redirect to the secure profile section
			failureRedirect : '/wrongsignup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------


      // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));



	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/home',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/home',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/home',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/home');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/home');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

