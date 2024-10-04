import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;