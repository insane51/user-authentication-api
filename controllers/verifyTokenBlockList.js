const ExpiredToken = require('../models/expiredToken');

//To check that the token is not in block list
const checkForExpiredToken = async(req,res,next)=>{
    try{
        //Get token from user's request header
        const token = req.headers.token;
        //Try to find the token in the block list
        const check = await ExpiredToken.findOne({token : token});

        if(check != null){
            //If we find the token in list then this code will run
            res.status(401).json("Token is not vaild,Login again!!!");
            return;
        }
        //When token is not found in block list ,the the req will be forward to the next function
        next();

    }catch(err){
        //If any error occured this response will send to the user
        res.status(500).json("Server error :"+err);
    }
}

module.exports = {checkForExpiredToken}