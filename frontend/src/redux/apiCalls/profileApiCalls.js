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
<<<<<<< HEAD
=======
      dispatch(profileActions.profileStart());

>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
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
<<<<<<< HEAD
      error.response?.data?.error || error.message || "Failed to update profile";
=======
        error.response?.data?.error || error.message || "Failed to update profile";
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
      dispatch(profileActions.profileFailure(message));
      toast.error(message);
    }
  };
}

//Delete Profile
export const deleteProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch(profileActions.setLoading());
    const {data} = await request.delete(`/api/users/profile/${profileId}`, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token,
      },
    });
    dispatch(profileActions.setIsProfileDeleted());
<<<<<<< HEAD
    toast.success(data?.message);
=======
    toast.success(data.message);
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
    setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
  } catch (err) {
    dispatch(
      profileActions.profileFailure(err.response?.data?.errors || err.message)
    );
    toast.error(err.response?.data?.error);
    dispatch(profileActions.clearLoading());
  }
};
<<<<<<< HEAD

// Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setUserCount(data.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
}

// Get All Users Profile (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/profiles`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setProfiles(data.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
}

=======
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
