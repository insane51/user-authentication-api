const User = require('../models/user');
const CryptoJS = require('crypto-js');
const {nameValidator,emailValidator,passwordValidator} = require('./validator');


//GET USER PROFILE
const getUserProfileController = async(req,res)=>{
    
    try{
        const user = await User.findOne({ _id : req.user.id});
        const {username,email} = user;
        res.status(200).json({
            username : username,
            email : email,
        });

    }catch(err){
        res.status(500).json({message:`Server error `+err});
    }
}


//USER UPDATE
const profileUpdateController = async (req,res)=>{

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

    try{
        //CHECK FOR CORRECT PASSWORD
        const user = await User.findById(req.params.id);
        const password = CryptoJS.enc.Base64.stringify(
            CryptoJS.HmacSHA256(req.body.password,process.env.PASS_KEY));
            
        const originalPassword = user.password;
        if(password !== originalPassword){
            res.status(401).json({message:"Wrong Password!!!"});
            return;
        }

        var updateUser = {
            username: req.body.username,
            email: req.body.email,
            password : password
        };

        const dbResponse = await User.findByIdAndUpdate(req.params.id,updateUser,{new:true});
        res.status(201).json({message:`User Updated Successfully`});
        return;
    }catch(err){
        res.status(500).json({message:`Server error Please try after sometime`});
    }
}





module.exports = {
    profileUpdateController,
    getUserProfileController
};