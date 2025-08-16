import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
     profile: null, 
     loading: false, 
     isProfileDeleted: false,
     error: null 
  },

  reducers: {
    profileStart(state) {
      state.loading = true;
    },
    setProfile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },
    profileFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setProfilePhoto(state, action) {
        state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
        state.profile = action.payload;
    },
    setLoading(state){
      state.loading = true;
    },
    clearLoading(state){
      state.loading = false;
    },
    setIsProfileDeleted(state){
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearIsProfileDeleted(state){
      state.isProfileDeleted = false;
    },
  },

});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };