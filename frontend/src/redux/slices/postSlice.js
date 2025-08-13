// src/redux/slices/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    postCount: null,
    postCategory: [],
    loading: false,
    error: null
  },
  reducers: {
    getPostsStart(state) {
      state.loading = true;
    },
    setPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    setPostsCount(state, action) {
      state.postCount = action.payload;
    },
    setPostsCategory(state, action) {
      state.postCategory = action.payload;
    },
    getPostsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

const postReducer = postsSlice.reducer;
const postActions = postsSlice.actions;

export { postActions , postReducer  };