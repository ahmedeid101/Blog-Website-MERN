const express = require("express");
const {
  createPost,
  getPost,
  getAllPosts,
  getPostsCount,
  updatePost,
  updatePostImage,
  deletePost,
  toggleLikePost
} = require("../DependencyInjection/PostInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const PostValidator = require("../Validations/post.validators");
const validateObjectId = require("../Middlewares/validateObjectId");
const uploadPhoto = require('../Middlewares/photoUpload');

const router = express.Router();

// Routes
router.post('/', authMiddleware(), uploadPhoto, PostValidator.validateCreatePost, createPost);
router.get("/",  getAllPosts);
router.get("/count",  getPostsCount);
router.get("/:id", validateObjectId, getPost);
router.put("/:id", authMiddleware(), validateObjectId, uploadPhoto, PostValidator.validateUpdatePost, updatePost);
router.put("/upload-image/:id", authMiddleware(), uploadPhoto, validateObjectId, updatePostImage);
router.delete("/:id", authMiddleware(['admin', 'user']), validateObjectId, deletePost);
router.put("/like/:id", authMiddleware(), validateObjectId, toggleLikePost);

module.exports = router;