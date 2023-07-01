const jwt = require('jsonwebtoken');


//Verify the token
const verifyToken = (req,res,next)=>{
    //Get token from user's  request header
    const token = req.headers.token;

    //If user has token then execute this
    if(token){
        //Verify the token 
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            //If err occured and token not valid send it to the user that token is not valid
            if(err) res.status(401).json("Token is not valid!");
            //If token is valid then user's details will be append with the request 
            // and call the next function
            req.user =user;
            next();
        })

    }else{
        //If user does not have any token send this response
        return res.status(400).json("You are not autheticated!!"); 
    }
}

//Token verify and check the user is same of different
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        //Check the user id send by user and the user id fetch from token are same or not
        if(req.user.id === req.params.id){
            next();
        }else{
            //if ids are different,then this response will be sent to the user
            res.status(402).json("You are not allowed to do that!")
        }
    });
}

module.exports = { 
    verifyToken,
    verifyTokenAndAuthorization
};