const express = require("express");
const bodyParser  = require("body-parser");
const Post = require("./Models/post");
const mongoose = require("mongoose");
const app = express();
const postRouter = require("./Routes/posts"); 
const path = require("path");

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-with,Content-Type,Accept");
  res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,PUT,OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

//app.use(cookieParser());
//app.use(upload.array());
app.use("/api/posts",postRouter);
module.exports = app;
