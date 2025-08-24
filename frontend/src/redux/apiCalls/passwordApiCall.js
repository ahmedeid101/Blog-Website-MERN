import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Forgot Password
export function forgotPassword(email) {
    return async () => {
      try {
        const { data } = await request.post("/api/auth/forgot-password",{ email });
        toast.success(data.message);
      } catch (error) {
         if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
      }
    }
}

// Get Reset Password
export function getResetPassword(userId, token) {
    return async (dispatch) => {
      try {
        await request.get(`/api/auth/reset-password/${userId}/${token}`);
      } catch (error) {
        console.log(error);
        dispatch(passwordActions.setError());
      }
    }
}

// Reset The Password
export function resetPassword(newPassword, userId, token) {
    return async () => {
      try {
        const { data } = await request.post(
            `/api/auth/reset-password/${userId}/${token}`, 
            { password: newPassword }
            );
        toast.success(data.message);
      } catch (error) {
        if (Array.isArray(error.response?.data?.errors)) {
        error.response.data.errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
      }
    }
}