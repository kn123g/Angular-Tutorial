const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/user");
const bcrypt= require("bcrypt");


mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://hobby-admin:kKpUVRG0UMvrOk0e@hobby.gtw16.mongodb.net/hobby-learning?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Databse Connected Successfully");
  })
  .catch(()=>{
    console.log("Databse Connection failed");
  });


  router.post("/login",(req,res)=>{
    const user = new User({email: "" ,password : ""});
   
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
                result : result
            });
        } )
        .catch(err => {
          console.log("user.js  => failed user creation");
            res.status(401).json({
            error: err
            });
        });
    });
   

   
  });
  module.exports= router;
  