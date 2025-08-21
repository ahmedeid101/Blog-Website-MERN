const ErrorResponse = require("../Utils/errorResponse");
const cloudinary = require("../config/cloudinaryConfig");

class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData) {
    // 1. Check for duplicate
    const { title, user, category } = postData;
    const existingPost = await this.postRepository.findByTitleAndUser(
      title,
      user
    );
    if (existingPost) {
      throw new ErrorResponse(
        "You already created a post with this title",
        400
      );
    }
    return this.postRepository.create(postData);
  }

  async getPostById(id) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new ErrorResponse("Post not found", 404);
    return post;
  }

  async getAllPosts({ pageNumber, category }) {
    const POST_PER_PAGE = 3;

    if (pageNumber) {
      return this.postRepository.findPaginated(pageNumber, POST_PER_PAGE);
    } else if (category) {
      return this.postRepository.findByCategory(category);
    } else {
      return this.postRepository.findAll(); //returns ALL without limit
    }
  }


//   async getAllPosts(query) {
//   const { category, page = 1, limit = 3 } = query;
//   const skip = (page - 1) * limit;

//   const filter = {};
//   if (category) filter.category = category;

//   const [posts, totalPosts] = await Promise.all([
//     this.postRepository.findAll(filter, skip, limit),
//     this.postRepository.countAll(filter),
//   ]);

//   return {
//     posts,
//     totalPosts,
//     totalPages: Math.ceil(totalPosts / limit),
//     currentPage: Number(page),
//   };
// }

  async countPosts(filter = {}) {
    return this.postRepository.countAll(filter);
  }

  async updatePost(id, updateData, user) {
    if (!user || !user.role) {
      throw new Error("Unauthorized: user role is missing");
    }

    const post = await this.postRepository.findById(id);
    if (!post) throw new ErrorResponse("Post not found", 404);

    // Update the post
    return this.postRepository.update(id, updateData, {
      populate: ["user"],
    });
  }
  async updatePostImage(postId, user, imageData) {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new ErrorResponse("Post not found", 404);

    // Authorization
    if (!user || typeof user !== "object") {
      throw new Error("Unauthorized: user object is missing");
    }

    // Remove old image if exists
    if (post.image?.publicId) {
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    // Update image
    return this.postRepository.update(postId, {
      image: imageData,
    });
  }

    async deletePost(id, user) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new ErrorResponse("Post not found", 404);

    // Only owner or admin can delete
    const isOwner = post.user._id.toString() === user._id.toString();
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new ErrorResponse("Not authorized to delete this post", 403);
    }
    return this.postRepository.delete(id);
  }


  async updateLikes(postId, updateQuery) {
    return this.postRepository.updateLikes(postId, updateQuery, {
      populate: ["likes", "user"],
    });
  }
}

module.exports = PostService;
