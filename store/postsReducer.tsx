import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPost } from "./postsAction";
import { getPosts } from "./postsAction";
import { updatePost } from "./postsAction";
import { deletePost } from "./postsAction";
import { Post } from "../interfaces/Post";

interface PostState {
  postsList: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
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
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.postsList = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        const existingPost = state.postsList.find(
          (post) => post.id === action.payload.id
        );

        if (existingPost) {
          let incrementedId = action.payload.id;
          while (state.postsList.find((post) => post.id === incrementedId)) {
            incrementedId++;
          }

          const newPost = {
            ...action.payload,
            id: incrementedId,
          };

          state.postsList.unshift(newPost);
        } else {
          state.postsList.unshift(action.payload);
        }
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const existingPost = state.postsList.find(
          (post) => post.id === action.payload.id
        );
        const index = state.postsList.findIndex(
          (post) => post.id === action.payload.id
        );

        if (existingPost) {
          if (existingPost.isLocal) {
            console.log(action.payload);
            state.postsList[index] = {
              ...existingPost,
              ...action.payload,
            };
          } else {
            state.postsList[index] = action.payload;
          }
        }
      })
      .addCase(
        deletePost.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          const index = state.postsList.findIndex(
            (post) => post.id === action.payload.id
          );
          if (index !== -1) {
            state.postsList.splice(index, 1);
          }
        }
      );
  },
});

export default postsSlice.reducer;
