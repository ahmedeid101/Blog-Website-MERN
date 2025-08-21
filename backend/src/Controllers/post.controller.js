const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinaryConfig");

class PostController {
  constructor(postService, commentService) {
    this.postService = postService;
    this.commentService = commentService;
  }

  createPost = asyncHandler(async (req, res) => {
    const postData = { ...req.body, user: req.user.id };

    try {
      if (req.file) {
        const result = await this.#uploadToCloudinary(req.file);
        postData.image = { url: result.secure_url, publicId: result.public_id };
      }

      const post = await this.postService.createPost(postData);
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      if (postData?.image?.publicId)
        await cloudinary.uploader.destroy(postData.image.publicId);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  getPost = asyncHandler(async (req, res) => {
    const post = await this.postService.getPostById(req.params.id, req.user);
    res.status(200).json({ success: true, data: post });
  });

  getPostsCount = asyncHandler(async (req, res) => {
    const count = await this.postService.countPosts();
    res.status(200).json({ success: true, data: count });
  });

  getAllPosts = asyncHandler(async (req, res) => {
  const { page: pageNumber, category } = req.query;

  const posts = await this.postService.getAllPosts({
    pageNumber,
    category,
  });

  res.status(200).json({success: true, data:posts});
});

  // getAllPosts = asyncHandler(async (req, res) => {
  //   const { posts, totalPosts, totalPages, currentPage } =
  //     await this.postService.getAllPosts(req.query);

  //   res.status(200).json({
  //     success: true,
  //     count: posts.length,
  //     totalPosts,
  //     totalPages,
  //     currentPage,
  //     data: posts,
  //   });
  // });

  updatePost = asyncHandler(async (req, res) => {
    // 1. Call service to update the post
    const updatedPost = await this.postService.updatePost(
      req.params.id,
      req.body,
      req.user
    );

    // 2. Send response
    res.status(200).json({ success: true, data: updatedPost });
  });

  updatePostImage = asyncHandler(async (req, res) => {
    let updatedPost = { ...req.body };
    // 1. Validate image
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    if (req.file) {
      const result = await this.#uploadToCloudinary(req.file);
      updatedPost.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // 2. Update post image via service
    updatedPost = await this.postService.updatePostImage(
      req.params.id,
      req.user,
      updatedPost.image
    );

    // 3. Return updated post
    res.status(200).json({ success: true, data: updatedPost });
  });

  deletePost = asyncHandler(async (req, res) => {
    try {
      // 1. Get post and delete image if exists
      const post = await this.postService.getPostById(req.params.id);
      if (post.image?.publicId) {
        await cloudinary.uploader.destroy(post.image.publicId);
      }

      // 2. Delete the post (includes authorization check)
      await this.postService.deletePost(req.params.id, req.user);

      // 3. Delete all related comments
      await this.commentService.deleteCommentsByPostId(req.params.id);

      // 4. Respond
      res.status(200).json({ message: "Post and related comments deleted successfully", postId: post._id });

    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  toggleLikePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await this.postService.getPostById(postId);
    if (!post)
      return res.status(404).json({ success: false, error: "Post not found" });

    const alreadyLiked = post.likes.includes(userId.toString());

    const updateQuery = alreadyLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedPost = await this.postService.updateLikes(postId, updateQuery);

    res.status(200).json({ success: true, data: updatedPost });
  });

  // 🔒 Private helper method
  #uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "post-images" },
        (error, result) => (result ? resolve(result) : reject(error))
      );
      stream.end(file.buffer);
    });
  }
}

module.exports = PostController;
