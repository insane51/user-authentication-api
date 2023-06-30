const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    username : {type : String,require:true},
    email : {type : String,unique:true,require:true,lowercase: true},
    password : {type : String,require:true},
},{timestamps:true},);

module.exports = mongoose.model("User",userSchema);