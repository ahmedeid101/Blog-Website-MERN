import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    post: null,
    postsCount: null,
    postCategory: [],
    isPostCreated: false,
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
    setPost(state, action){
      state.post = action.payload;
    },
    setLikes(state, action){
      state.post.likes = action.payload.likes;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCategory(state, action) {
      state.postCategory = action.payload;
    },
    setLoading(state){
      state.loading = true;
    },
    clearLoading(state){
      state.loading = false;
    },
    setCreatingPost(state){
      state.isPostCreated = true;
      state.loading  = false;
    },
    clearCreatingPost(state){
      state.isPostCreated = false;
    },
    deletePost(state, action) {
      state.posts = action.posts.filter(post => post._id !== action.payload);
    },
    addCommenToPost(state, action){
      state.post.comments.push(action.payload);
    },
    updateCommentFromPost(state, action){
      state.post.comments = state.post.comments.map(comment =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteCommentFromPost(state, action){
      const comment = state.post.comments.find(comment => comment._id === action.payload);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
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