import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//fetch posts pased on page number
export const fetchPosts = (pageNumber) => async (dispatch) => {
  dispatch(postActions.getPostsStart());
  try {
    const res = await request.get(`/api/posts?page=${pageNumber}`);
    dispatch(postActions.setPosts(res.data.data)); // backend should return { data: [...] }
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//get posts count
export const getPostsCount = () => async (dispatch) => {
  dispatch(postActions.getPostsStart());
  try {
    const res = await request.get(`/api/posts/count`);
    dispatch(postActions.setPostsCount(res.data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};

//fetch posts pased on category
export const fetchPostsCategory = (category) => async (dispatch) => {
  dispatch(postActions.getPostsStart());
  try {
    const res = await request.get(`/api/posts?category=${category}`);
    dispatch(postActions.setPostsCategory(res.data.data));
  } catch (err) {
    dispatch(
      postActions.getPostsFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response.data.error);
  }
};