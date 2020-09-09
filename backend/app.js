const express = require("express");
const bodyParser  = require("body-parser");
const Post = require("./Models/post");
const mongoose = require("mongoose");
const app = express();
const postRouter = require("./Routes/posts"); 
const userRouter = require("./Routes/users"); 
const path = require("path");

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://hobby-admin:" + process.env.MONGO_ATLAS_PASSWORD+ "@hobby.gtw16.mongodb.net/hobby-learning?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Databse Connected Successfully");
  })
  .catch(()=>{
    console.log("Databse Connection failed");
  });

  
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-with,Content-Type,Accept,Authorization");
  res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,PUT,OPTIONS");
//  res.append('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

//app.use(cookieParser());
//app.use(upload.array());
app.use("/api/posts",postRouter);
app.use("/api/user",userRouter);
module.exports = app;
