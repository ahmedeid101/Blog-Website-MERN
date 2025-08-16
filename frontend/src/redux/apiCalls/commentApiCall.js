import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Create New Comment
export function createComment(newComment) {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.post("/api/comments", newComment, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
            },
        });
        dispatch(postActions.addCommenToPost(data.data));
      } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || error.message);
      }   
     }
  }
}

// Update Comment
export function updateComment(comment, commentId) {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.put(`/api/comments/${commentId}`, comment, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
            },
        });
        dispatch(postActions.updateCommentFromPost(data.data));
      } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || error.message);
      }   
     }
  }
}

// Delete Comment
export function deleteComment(commentId) {
    return async (dispatch, getState) => {
      try {
        await request.delete(`/api/comments/${commentId}`, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
            },
        });
        dispatch(postActions.deleteCommentFromPost(commentId));
      } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || error.message);
      }   
     }
  }
}