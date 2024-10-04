import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getComments, addComment } from "./commentsAction";
import { Comment } from "../interfaces/Comment"

interface CommentsState {
  commentsList: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  commentsList: [],
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.commentsList = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.commentsList.unshift(action.payload);
      });
  },
});

export default commentsSlice.reducer;
