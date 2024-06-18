const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { userSchema } = require("../models/Usermodel");
const userRouter=express.Router();

userRouter.post("/register",(req,res)=>{
    try {
        const {name,email,password}=req.body;
        bcrypt.hash(password, 3, async function(err, hash) {
            // Store hash in your password DB.
            const isuser=await userSchema.create({
                name:name,
                email:email,
                password:hash
            });

            res.send({"msg":"new user added","user":isuser});
        });
    } catch (error) {
        res.send({"msg":error.message});
    }
});

userRouter.post("/login",async(req,res)=>{
    try {
        const {name,email,password}=req.body;       
        const user = await userSchema.findOne( {where: {
            email: email
          }});
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result)
            {

                var token = jwt.sign({ userid:user._id }, 'masai');
                res.send({"msg":"login scuccesssfull","token":token,"user":user});
            }
        });
        
  
    } catch (error) {
        res.send({"msg":error.message});
    }
});



module.exports={userRouter}

