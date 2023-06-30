const mongoose = require('mongoose');

const expiredTokenSchema =  new mongoose.Schema({
    token : {type : String,require:true,unique:true},
    createdAt: { type: Date, default: Date.now },
});

expiredTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("ExpiredToken",expiredTokenSchema);