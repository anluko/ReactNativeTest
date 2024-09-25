import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "./postsAction";
import { getPosts } from "./postsAction";
import { updatePost } from "./postsAction";
import { deletePost } from "./postsAction";

const initialState = {
  postsList: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsList = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postsList.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.postsList.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.postsList[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state.postsList.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.postsList.splice(index, 1);
        }
      });
  },
});

export default postsSlice.reducer;
