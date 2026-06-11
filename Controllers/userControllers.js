const users = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SignUp and SignIn functions for user authentication

exports.SignUp = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser= await users.findOne({email:email});         //bcrypt for password encryption 
        if(existingUser){
            return res.status(400).json("User already exists");
        }
        else{
            const encryptedPassword= await bcrypt.hash(password,10);
            const newUser=new users({name,email,password:encryptedPassword});
            await newUser.save();
            res.status(200).json("User SignUp successful");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json("Error in SignUp :"+err);
    }
}


exports.SignIn = async (req,res)=>{
    try{
       const {email,password}=req.body;
       const existingUser= await users.findOne({email:email});
       const isPasswordMatch= await bcrypt.compare(password,existingUser.password);
         console.log(isPasswordMatch)
         if(isPasswordMatch){
            const token=jwt.sign({_id:existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"2h"});   //jwt for token generation
            res.status(200).json({token:token,user:existingUser.name});
         }
         else{
            res.status(400).json("Invalid Email/Password");
         }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error in SignIn :"+err});
    }
}