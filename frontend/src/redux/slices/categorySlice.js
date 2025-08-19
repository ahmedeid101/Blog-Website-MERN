import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
   name: "category",
   initialState: {
    categories: [],
   },
   reducers: {
      setCaregory(state,action) {
        state.categories = action.payload;
      },
<<<<<<< HEAD
      addCategory(state, action) {
         state.categories.push(action.payload);
      },
      deleteCategory(state, action) {
         state.categories = state.categories.filter(category => category._id !== action.payload);
      },
=======

>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
   }
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export { categoryReducer, categoryActions }

