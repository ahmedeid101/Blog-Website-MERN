import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Categoies
export function fetchCategoies() {
    return async (dispatch) => {
      try {
        const { data } = await request.get("/api/categories");
        dispatch(categoryActions.setCaregory(data.data));
      } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || error.message);
      }   
     }
  }
<<<<<<< HEAD
}

// Create Category
export function createCategory(newCategory) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.addCategory(data.data));
      toast.success("category created successfully");
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || error.message);
      } 
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.addCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error); 
    }
  };
=======
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
}