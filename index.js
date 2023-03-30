const express=require('express');
const path=require('path');
const port=8000;
// so that we can use database here
const db = require('./config/mongoose');
// so that we can use schema
// "Contact" will be used to populate our collection 
const Contact=require('./models/contact');
const app=express();

/*
// creating MiddleWare
app.use(function(req,res,next){
    console.log("MiddleWare 1 is called");
    next();
});
app.use(function(req,res,next){
     console.log("MiddleWare 2 is called!");
     next();
});
*/ 
/*
var  ContactList=[
    { name:"sachin khanna",phone:"1234567890"},
    {name:"virendera khanna",phone:"0987654321"},
    {name:"IIIT BH",phone:"354654323"},
]   */

// setting up our own Template engine
app.set('view engine','ejs');
// where are we going to place our views in a folder called 'views'.
// path.join(__dirname,views) will make code dynamic.
// path.join(__dirname,'views') is path of view folder
app.set('views',path.join(__dirname,'views'));

// setting  parser
// aim -> to get form data
app.use(express.urlencoded());
//  aim -> to use static files 
app.use(express.static('assets'));

app.get('/',function(req,res){
    //console.log(req);
    /* this will display the directory from which the server was started */
    //console.log(__dirname);
   // res.end("<b>Cool, it is running fine!</b>"); 

   // aim -> want to show form data on the screen or browser
   // fetch data from database using .find(); and 
   // store it in object named as db_object_data.
   Contact.find({},function(err,db_object_data){
       if(err){console.log("Error in fetching contact from Db");
       return;
    }
        // display it on the screen before that we need to add
        // this data object named db_object_data inside homes.js for loops
    return res.render('home',{title:"My Contact list",contact_list:db_object_data});
   })
   
});


app.get('/delete-contact',function(req,res){
    //console.log(req.query.phone);
    //let phone=req.query.phone;
    //let contactIndex=ContactList.findIndex(contact=>contact.phone==phone);
    //console.log(contactIndex);
    //if(contactIndex!=-1){
      //  ContactList.splice(contactIndex,1);
    //}
    
    // get the id from query in the ul
    const id=req.query.id;

    // find the contact in database using id and then delete
    //Contact.findByIdAndDelete(id,function(err){ });
    Contact.findByIdAndDelete(id,function(err){
        // if err is coming
        if(err){
            console.log("Error in deleting an object from database");
            return;
        };
        // back to the page
       return res.redirect('back');
    });

});
// after add, the form data is coming here 
// post is used when we are creating something 
app.post('/contact-list',function(req,res){
    console.log(req.body);  
    
    /*
    ContactList.push({
        name:req.body.name,
        phone:req.body.phone,
    }); */
       // ContactList.push(req.body);

        // accessing the schema
        // const Contact=require('./models/contact');
       //pushing data inside database
       //Contact.create({},function(err,insert_data){ } );
       Contact.create(
           {
             name:req.body.name,
             phone:req.body.phone,
           }, function(err,newContact){
               if(err){
                    console.log("error in creating a contact");
                    return;
               }
               console.log('********',newContact);
               return res.redirect('back');
           });
    });

app.listen(port,function(err){
    if(err){
        console.log("Express server is not running on the port!",error);
    }
    console.log(" WOW! Express server is running on the port!",port);
});




