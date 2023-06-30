const CryptoJS = require('crypto-js');
const User = require('../models/user');
const ExpiredToken = require('../models/expiredToken');
const jwt = require('jsonwebtoken');

const {nameValidator,emailValidator,passwordValidator} = require('./validator');

//REGISTER
const registerController = async (req,res)=>{
    
    //Validate the data
    if(!nameValidator(req.body.username)){
        res.status(200).json("Invalid user name");
        return;
    }else if(!emailValidator(req.body.email)){
        res.status(200).json("Invalid email address");
        return;
    }else if(!passwordValidator(req.body.password)){
        res.status(200).json("Invalid password format")
        return;
    }
    
    //Create new user    
    const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password:  CryptoJS.enc.Base64.stringify(
            CryptoJS.HmacSHA256(req.body.password,process.env.PASS_KEY))
    });

    //Try to save user to the Database
    try{
        //Check for email is already registered or not
        const emailCheck = await User.findOne({email:newUser.email});
        if(emailCheck){
            res.status(200).json({message:"Email already registered"});
            return;
        }

        const savedUser = await newUser.save();
        res.status(201).json({message : `${savedUser.username} registered successfully`});

    }catch(err){
        res.status(501).json({message :"Server Error "});
    }
}

//LOGIN
const loginController = async(req,res)=>{        

    try{
        //Find the user using email
        const user = await User.findOne({email:req.body.email});
        //User not found then retuen the request and user not allowed  to login
        if(!user){
            res.status(200).json({message :"user not found"});
            return;
        }
        //Check for correct password
        const password = CryptoJS.enc.Base64.stringify(
            CryptoJS.HmacSHA256(req.body.password,process.env.PASS_KEY));

        const originalPassword = user.password;
        
        if(password !== originalPassword){
            res.status(200).json({message:"Wrong Password!!!"});
            return;
        }
        //JWT token is assign to the user and  save it to the cookie
        //Token will expires after one hour
        const accessToken = jwt.sign({
            id:user._id
        },process.env.JWT_KEY,{expiresIn:'1h'});
        
        res.status(202).json({ message: "Logged in successfully", token : accessToken});

    }catch(err){
        res.status(502).json("Server Error"+ err);
    }
}

//LOGOUT
const logoutController = async (req,res)=>{

    try{
        const token =  (req.headers.token).split(" ")[1];
        const exToken = new ExpiredToken({
            token : token
        });

        const result = await exToken.save({token : token});

        res.status(200).json({message : "Logout successfully"});
    }catch(err){
        res.status(500).json("Server error :"+err);
    }
}

module.exports ={
    registerController,
    loginController,
    logoutController
}


