import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});
