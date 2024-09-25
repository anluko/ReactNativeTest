import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "./commentsAction";
import { addComment } from "./commentsAction";

const initialState = {
  commentsList: [],
  loading: false,
  error: null,
};

export const comentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentsList = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.commentsList.unshift(action.payload);
      });
  },
});

export default comentsSlice.reducer;
