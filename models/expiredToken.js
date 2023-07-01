const mongoose = require('mongoose');

// Schema for JWT token block list 
const expiredTokenSchema =  new mongoose.Schema({
    token : {type : String,require:true,unique:true},
    createdAt: { type: Date, default: Date.now },
});

//Add a TTL index so that the entry will be automatic delete after onr hour(3600 sec)
expiredTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

//ExpiredToken model will be exported
module.exports = mongoose.model("ExpiredToken",expiredTokenSchema);