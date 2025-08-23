import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//fetch posts pased on page number
export const fetchPosts = (pageNumber) => async (dispatch) => {
  try {
    const { data } = await request.get(`/api/posts?page=${pageNumber}`);
    dispatch(postActions.setPosts(data.data)); // backend should return { data: [...] }
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//fetch posts By Post Id
export const fetchPost = (postId) => async (dispatch) => {
  try {
    const res = await request.get(`/api/posts/${postId}`);
    dispatch(postActions.setPost(res.data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//get posts count
export const getPostsCount = () => async (dispatch) => {
  try {
    const { data } = await request.get(`/api/posts/count`);
    dispatch(postActions.setPostsCount(data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//fetch posts pased on category
export const fetchPostsCategory = (category) => async (dispatch) => {
  try {
    const { data } = await request.get(`/api/posts?category=${category}`);
    dispatch(postActions.setPostsCategory(data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//Create Post
export const createPost = (newPost) => async (dispatch, getState) => {
  try {
    dispatch(postActions.setLoading());
    await request.post(`/api/posts`, newPost, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(postActions.setCreatingPost());
    setTimeout(() => dispatch(postActions.clearCreatingPost()), 2000); //after 2s
  } catch (error) {
    dispatch(
      postActions.getPostsFailure(error.response?.data?.errors || error.message)
    );

    if (Array.isArray(error.response?.data?.errors)) {
      error.response.data.errors.forEach((msg) => toast.error(msg));
    } else {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
    dispatch(postActions.clearLoading());
  }
};

//Toggle Like
export const toggleLike = (userId) => async (dispatch, getState) => {
  dispatch(postActions.getPostsStart());
  try {
    const { data } = await request.put(`/api/posts/like/${userId}`, {}, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
      },
    });
    dispatch(postActions.setLikes(data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//Update Post Image
export const updatePostImage = (newImage, userId) => async (dispatch, getState) => {
  dispatch(postActions.getPostsStart());
  try {
    await request.put(`/api/posts/upload-image/${userId}`, newImage, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("New Post Image Uploaded Successfully");
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//Update Post
export const updatePost = (newPost, userId) => async (dispatch, getState) => {
  dispatch(postActions.getPostsStart());
  try {
    const { data } = await request.put(`/api/posts/${userId}`, newPost, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
      },
    });
    dispatch(postActions.setPost(data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};
//Delete Post
export const deletePost = (postId) => async (dispatch, getState) => {
  dispatch(postActions.getPostsStart());
  try {
    const { data } = await request.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
      },
    });
    dispatch(postActions.deletePost(data.postId));
    toast.success(data.message);
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response?.data?.error);
  }
};

// Get All Posts(for admin)
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPosts(data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
