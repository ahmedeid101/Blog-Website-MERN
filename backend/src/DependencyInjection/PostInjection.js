const Post = require("../Models/Post");
const Comment = require("../Models/Comment");
const PostRepository = require("../Repositories/post.repository");
const PostService = require("../Services/post.service");
const PostController = require("../Controllers/post.controller");
const CommentService = require("../Services/comment.service");
const CommentRepository = require("../Repositories/comment.repository");

// Initialize dependencies
const postRepository = new PostRepository(Post);
const commentRepository = new CommentRepository(Comment);

const postService = new PostService(postRepository);
const commentService = new CommentService(commentRepository);

const postController = new PostController(postService, commentService);

module.exports = {
  createPost: postController.createPost,
  getPost: postController.getPost,
  getAllPosts: postController.getAllPosts,
  getPostsCount: postController.getPostsCount,
  updatePost: postController.updatePost,
  updatePostImage: postController.updatePostImage,
  deletePost: postController.deletePost,
  toggleLikePost: postController.toggleLikePost
};