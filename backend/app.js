const express = require("express");
const bodyParser  = require("body-parser");
const Post = require("./Models/post");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://hobby-admin:kKpUVRG0UMvrOk0e@hobby.gtw16.mongodb.net/hobby-learning    ?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Databse Connected Successfully");
  })
  .catch(()=>{
    console.log("Databse Connection failed");
  });
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-with,Content-Type,Accept");
  res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,PUT,OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post("/api/posts",(req,res)=>{
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message:'post added successfully'
  });
});
app.use("/api/posts",(req,res,next)=> {
    console.log("First Gateway");
    const posts = [{
      id:"ekfewknfekfm",
      title : "pen",
      content:"write"
    },
    {
      id:"knckenfdf",
      title : "eraser",
      content:"erase"
    }];
    res.status(200).json({
      message : "Post fetched Successfully",
      posts : posts
    });

    next();
});
app.use((req,res,next)=> {

});

module.exports = app;
