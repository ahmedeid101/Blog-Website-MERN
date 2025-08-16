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
}