import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
     profile: null, 
     loading: false, 
     isProfileDeleted: false,
<<<<<<< HEAD
     usersCount:null,
     profiles: [],
=======
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
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
<<<<<<< HEAD
      state.profile.profilePhoto = action.payload;
      state.loading = false;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
      state.loading = false;
=======
        state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
        state.profile = action.payload;
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
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
<<<<<<< HEAD
     setUserCount(state,action) {
      state.usersCount = action.payload;
    },
    setProfiles(state,action) {
      state.profiles = action.payload;
    },
=======
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
  },

});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };