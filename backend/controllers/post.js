const Post = require("../Models/post");
const PostWImage = require("../Models/postWImage");

exports.addPost = (req,res)=>{
    const post = new Post({
      title : req.body.title,
      content : req.body.content,
      creator : req.userData.userID
    });
    post.save();
    console.log(post);
    res.status(201).json({
      message:'post added successfully',
      id:post._id
    });
  }

  exports.addPostImage =  (req,res)=>{
    const url = req.protocol + "://" + req.get("host");
    const post = new PostWImage({
      title : req.body.title,
      content : req.body.content,
      image: url + "/images/" + req.file.filename,
      creator : req.userData.userID
    });
    console.log("posts.js => file path : " +url + "/images/" + req.file.filename)
    post.save().then( createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
    console.log(post);
   }

   exports.updatePost = (req,res)=>{
    const post = new Post({
      _id : req.body.id,
      title : req.body.title,
      content : req.body.content
    });
    console.log("router.js = > updating");
  Post.updateOne({_id:req.params.id},post).then(result=>{
    res.status(200).json({message: "update successfull"});
  });
}

exports.updatePostImage = (req,res)=>{
    const url = req.protocol + "://" + req.get("host");
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = new PostWImage({
      _id : req.body.id,
      title : req.body.title,
      content : req.body.content,
      image: imagePath,
      creator : req.userData.userID
    });
    console.log("router.js = > updating");
    PostWImage.updateOne({_id:req.params.id, creator: req.userData.userID},post).then(result=>{
    res.status(200).json({message: "update successfull"});
  });
  }

  exports.getPost = (req,res,next)=> {
    console.log("First Gateway");
    Post.find().then(documets=>{
      console.log(documets);
      res.status(200).json({
        message : "Post fetched Successfully",
        posts : documets
      });
      next();
    });
}

exports.getPostImage = (req,res,next)=> {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    const postQuery = PostWImage.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
  
    console.log("posts.js queryString => ");
    console.log(req.query);
    postQuery.then(documents => {
      fetchedPosts = documents;
      return PostWImage.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    });
  }

  exports.editPost = (req, res, next) => {
    console.log("posts.js => " +req.params.id);
    Post.findById(req.params.id).then(post => {
      if (post) {
        console.log("posts.js => " +post);
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
  }

  exports.editPostImage = (req, res, next) => {
    console.log("posts.js editImage=> " +req.params.id);
    PostWImage.findById(req.params.id).then(post => {
      if (post) {
        console.log("posts.js => " +post);
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
  }

  exports.deletePost = (req,res,next)=> {
    console.log("router.js => deleting uuid");
    Post.deleteOne({_id:req.params.id}).then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized to delete!" });
      }
    })
  }

  exports.deletePostImage = (req,res,next)=> {
    console.log("router.js => deleting image uuid");
    PostWImage.deleteOne({_id:req.params.id, creator: req.userData.userID }).then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized to delete!" });
      }
    })
  }