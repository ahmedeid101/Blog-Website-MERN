import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { profile: null, loading: false, error: null },
  //initialState: { data: null, loading: false, error: null },
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
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };



// import {createSlice} from "@reduxjs/toolkit";

// const profileSlice = createSlice({
//     name: 'profile',
//     initialState: {
//         profile: null,
//     },
//     reducers: {
//         setProfile(state, action){
//             state.profile = action.payload;
//         },
//         setProfilePhoto(state, action){
//             state.profile.profilePhoto = action.payload;
//         },
//     }
// });

// const profileReducers = profileSlice.reducer;
// const profileActions = profileSlice.actions;

// export { profileReducers, profileActions};