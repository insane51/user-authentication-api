const ExpiredToken = require('../models/expiredToken');


const checkForExpiredToken = async(req,res,next)=>{
    try{
        const token = (req.headers.token).split(" ")[1];
        console.log("token : "+token);
        const check = await ExpiredToken.findOne({token : token});
        if(check != null){
            res.status(401).json("Token is not vaild,Login again!!!");
            return;
        }
        next();

    }catch(err){
        res.status(500).json("Server error :"+err);
    }
}

module.exports = {checkForExpiredToken}