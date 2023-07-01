const mongoose = require('mongoose');

//User Schema to store the user's details to the database
const userSchema =  new mongoose.Schema({
    username : {type : String,require:true},
    email : {type : String,unique:true,require:true,lowercase: true},
    password : {type : String,require:true},
},{timestamps:true},);

module.exports = mongoose.model("User",userSchema);