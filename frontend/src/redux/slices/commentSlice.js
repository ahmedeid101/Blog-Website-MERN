import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
   name: "comment",
   initialState: {
    comments: [],
   },
   reducers: {
      setComments(state,action) {
        state.comments = action.payload;
      },
<<<<<<< HEAD
      deleteComment(state,action) {
         state.comments = state.comments.filter(c => c._id !== action.payload);
      },
=======
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980

   }
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentReducer, commentActions }

