import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { profileActions } from "../slices/profileSlice";

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register",user);
      dispatch(authActions.register(data.message));
    } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
    }
  }
}

// Login User
export function loginUser(user) {
    return async (dispatch) => {
      try {
        const { data } = await request.post("/api/auth/login",user);
        dispatch(authActions.login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || error.message);
      }   
     }
  }
}

//Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    dispatch(profileActions.setProfile(null)); // reset profile state
    localStorage.removeItem("userInfo");
  }
}



// Verify Email
export function verifyEmail(userId,token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  }
}
