// require the mongoose
const mongoose=require('mongoose');

// creating the Schema for db
const contactSchema= new mongoose.Schema({
   
     name:{  type:String,   required:true, },
     phone:{ type:String,    required:true, },
});

// Name of the collection which will be used in  Schema  or
// What do we want to call our collection in schema
// Here collection name is  Contact. and 
// First Alphabet of Name must be Capital
// model signifies the Collection
const Contact= mongoose.model('Contact',contactSchema);

// exporting so that we can use it in other folder
module.exports=Contact;