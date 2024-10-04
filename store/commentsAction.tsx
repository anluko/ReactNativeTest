import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../interfaces/Comment"
import axios from "axios";

interface AddCommentPayload {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const getComments = createAsyncThunk<Comment[], number>(
  "getComments",
  async (postId) => {
    try {
      const { data } = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return data;
    } catch (error) {
      console.error("Getting comment error: " + error);
    }
  }
);

export const addComment = createAsyncThunk<Comment, AddCommentPayload>(
  "addComment",
  async (postData) => {
    try {
      const { data } = await axios.post<Comment>(
        "https://jsonplaceholder.typicode.com/comments",
        postData
      );

      return data;
    } catch (error) {
      console.error("Adding comment error: " + error);
    }
  }
);
``
