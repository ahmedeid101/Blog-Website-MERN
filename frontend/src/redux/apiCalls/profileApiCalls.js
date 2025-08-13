import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from 'react-toastify';
import { authActions } from "../slices/authSlice";

//Get User Profile
export function getUserProfile(id) {
  return async (dispatch) => {
    try {
      const res = await request.get(`/api/users/profile/${id}`);
      dispatch(profileActions.setProfile(res.data));
    } catch (error) {
      dispatch(profileActions.profileFailure(error.response?.data?.errors || error.message));
      toast.error(error.response.data.error);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/upload-photo`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          }
        }
      );

      // Extract the profile photo from data.data (backend shape)
      const updatedPhoto = data.data.profilePhoto;

      dispatch(profileActions.setProfilePhoto(updatedPhoto));
      dispatch(authActions.setUserPhoto(updatedPhoto));

      // Update user in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = updatedPhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));

      toast.success("Profile photo updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to upload photo");
    }
  };
}

export function updateProfile(userId, newData) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.profileStart());

      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        newData,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        }
      );

      const updatedUser = data.data; // backend shape

      dispatch(profileActions.updateProfile(updatedUser));
      dispatch(authActions.setUsername(updatedUser.username)); // updates auth state

      // Update username in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = updatedUser?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));


      toast.success("Profile updated successfully");
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to update profile";
      dispatch(profileActions.profileFailure(message));
      toast.error(message);
    }
  };
}


// // Update Profile 
// export function updateProfile(userId, newData) {
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await request.put(
//         `/api/users/profile/${userId}`,
//         newData,
//         {
//           headers: {
//             Authorization: "Bearer " + getState().auth.user.token,
//           }
//         }
//       );

//       // Extract the profile photo from data.data (backend shape)
//       const updatedProfile = data.data.profile;

//       dispatch(profileActions.updateProfile(updatedProfile));
//       dispatch(authActions.setUsername(updatedProfile));

      // // Update user in local storage
      // const user = JSON.parse(localStorage.getItem("userInfo"));
      // user.username = updatedProfile;
      // localStorage.setItem("userInfo", JSON.stringify(user));

//       toast.success("Profile updated successfully");
//     } catch (error) {
//       if (Array.isArray(error.response?.data?.errors)) {
//         error.response.data.errors.forEach((msg) => toast.error(msg));
//       } else {
//         toast.error(error.response?.data?.error || error.message);
//       } 
//       //toast.error(error.response?.data?.error || "Failed to update profile");
//     }
//   };
// }
