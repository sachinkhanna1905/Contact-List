// require the liberary
const mongoose = require('mongoose');

// connecting to the Database
// contact_list_db is just a name it can be anything
mongoose.connect('mongodb://localhost/contact_list_db');

// aquire the connection (to check f its is successful)
const db=mongoose.connection;

//error 
db.on('error',console.error.bind(console,"error in connecting to the db"));

// if its running then print the message
db.once('open',function(){
   console.log("Successfully Connected to the db");
});