const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../Models/post");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
    console.log("posts.js => destination error : " + error);
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
    console.log("posts.js => filename" + name );
  }
});

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://hobby-admin:kKpUVRG0UMvrOk0e@hobby.gtw16.mongodb.net/hobby-learning?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Databse Connected Successfully");
  })
  .catch(()=>{
    console.log("Databse Connection failed");
  });


router.post("/",(req,res)=>{
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message:'post added successfully',
    id:post._id
  });
});
router.post("/reactive",  multer({ storage: storage }).single("image"),(req,res)=>{
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message:'post added successfully',
    id:post._id
  });
});
router.put("/:id",(req,res)=>{
    const post = new Post({
      _id : req.body.id,
      title : req.body.title,
      content : req.body.content
    });
    console.log("router.js = > updating");
  Post.updateOne({_id:req.params.id},post).then(result=>{
    res.status(200).json({message: "update successfull"});
  });
});
router.put("/reactive/:id",(req,res)=>{
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    content : req.body.content
  });
  console.log("router.js = > updating");
Post.updateOne({_id:req.params.id},post).then(result=>{
  res.status(200).json({message: "update successfull"});
});
});
router.get("/",(req,res,next)=> {
    console.log("First Gateway");
    Post.find().then(documets=>{
      console.log(documets);
      res.status(200).json({
        message : "Post fetched Successfully",
        posts : documets
      });
      next();
    });
});
router.get("/edit/:id", (req, res, next) => {
  console.log("posts.js => " +req.params.id);
  Post.findById(req.params.id).then(post => {
    if (post) {
      console.log("posts.js => " +post);
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
router.delete("/:id",(req,res,next)=> {
  console.log("router.js => deleting uuid");
  Post.deleteOne({_id:req.params.id}).then(result => {
    res.status(200).json({message:"Post deleted"});
  })
});

module.exports= router;
