const express = require("express");

const router = express.Router();
const saveImage = require('../middleware/file');

const checkAuth = require("../middleware/check-auth");
const postController = require("../controllers/post");


router.post("/",checkAuth,postController.addPost);

router.post("/reactive", checkAuth,saveImage,postController.addPostImage);  

router.put("/:id",checkAuth,postController.updatePost);

router.put("/reactive/:id", checkAuth, saveImage ,postController.updatePostImage);

router.get("/",postController.getPost);

router.get("/image",postController.getPostImage);

router.get("/edit/:id",checkAuth, postController.editPost );

router.get("/editImage/:id",checkAuth, postController.editPostImage);

router.delete("/:id",postController.deletePost);

router.delete("/image/:id",checkAuth,postController.deletePostImage);

module.exports= router;
