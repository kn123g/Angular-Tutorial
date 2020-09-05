const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/user");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://hobby-admin:kKpUVRG0UMvrOk0e@hobby.gtw16.mongodb.net/hobby-learning?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Databse Connected Successfully");
  })
  .catch(()=>{
    console.log("Databse Connection failed");
  });

  router.post("/signup",(req,res)=>{
    bcrypt.hash(req.body.password,10).then(hash => {
      const user = new User(
        {
          email: req.body.email ,
          password : hash
        });
        user.save().
        then(result => {
          console.log("user.js => user created");
          console.log(result);
            res.status(201).json({
                message:"user created",
                result : {email : result.email,userid : result._id},
                created : true
            });
        } )
        .catch(err => {
          console.log("user.js  => failed user creation");
            res.status(401).json({
            error: "failed user creation",
            });
        });
    });
  });
    router.post("/login", (req,res)=>{
      let fetchedUser;
        User.findOne({email:req.body.email }).then(user => {
            if(!user)
            {
            console.log("user not found");  
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          else{
            fetchedUser = user;
           return bcrypt.compare(req.body.password,user.password);
          }
        }).then(result =>{
            if(!result){
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            else{
              const token = jwt.sign(
                {
                  email : fetchedUser.email , 
                  userid : fetchedUser._id 
                },'secret_this_should_be_longer',{expiresIn : '1h'});
                res.status(200).json({
                  token :token,
                  expiresIn: 3600,
                  userId : fetchedUser._id
                });
            }
        })
        .catch(err=>{
          return res.status(401).json({
            message: "Auth failed"
          })
        });
    });
 

module.exports= router;
  