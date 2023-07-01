const User = require('../models/user');
const CryptoJS = require('crypto-js');
const {nameValidator,emailValidator,passwordValidator} = require('./validator');


//GET USER PROFILE
const getUserProfileController = async(req,res)=>{
    
    //Try to fetch the user's details from the database using user's id.
    try{
        const user = await User.findOne({ _id : req.user.id});
        const {username,email} = user;

        //The user's details will be sent to the user as a response
        res.status(200).json({
            username : username,
            email : email,
        });

    }catch(err){
        //If any server error occured it will send to the user
        res.status(500).json({message:`Server error `+err});
    }
}


//USER UPDATE
const profileUpdateController = async (req,res)=>{

    //Validate the data
    if(!nameValidator(req.body.username)){
        res.status(404).json("Invalid user name");
        return;
    }else if(!emailValidator(req.body.email)){
        res.status(405).json("Invalid email address");
        return;
    }else if(!passwordValidator(req.body.newPassword)){
        res.status(406).json("Invalid password format")
        return;
    }

    // Generate a hashed value for user's old password,for verification
    const oldPassword = CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(req.body.oldPassword,process.env.PASS_KEY));
    try{
        //Fetch the user from database using it's id.
        const user = await User.findById(req.params.id);
        
        //User's orignal hashed password fetched from the database
        const originalPassword = user.password;
        //CHECK FOR CORRECT PASSWORD
        if(oldPassword !== originalPassword){
            res.status(401).json({message:"Wrong Password!!!"});
            return;
        }

        //Generate a hashed value of new password send by the user
        const newPassword = CryptoJS.enc.Base64.stringify(
            CryptoJS.HmacSHA256(req.body.newPassword,process.env.PASS_KEY));

        //Create a new User
        var updateUser = {
            username: req.body.username,
            email: req.body.email,
            password : newPassword
        };

        //Find the user by ID and update 
        const dbResponse = await User.findByIdAndUpdate(req.params.id,updateUser,{new:true});
        const {username,email} = dbResponse;

        //Response will be sent to the user
        res.status(200).json({
            message:`User Updated Successfully`,
            username : username,
            email : email
        });
        return;
    }catch(err){
        //If any erroe occured ,sent it to the user as a response
        res.status(500).json({message:`Server error Please try after sometime`});
    }
}

module.exports = {
    profileUpdateController,
    getUserProfileController
};