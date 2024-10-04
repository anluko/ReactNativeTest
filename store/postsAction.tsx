import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../interfaces/Post";
import axios from "axios";

interface AddPostPayload {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface UpdatePostPayload {
  id: number;
  putData: Partial<Post>;
  isLocal: boolean;
}

export const getPosts = createAsyncThunk<
  Post[],
  { page: number; limit: number }
>("getPosts", async ({ page, limit }) => {
  try {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  } catch (error) {
    console.error("Getting posts error: " + error);
  }
});

export const addPost = createAsyncThunk<Post, AddPostPayload>(
  "addPost",
  async (postData) => {
    try {
      const { data } = await axios.post<Post>(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );
      return data;
    } catch (error) {
      console.error("Adding posts error: " + error);
    }
  }
);

export const updatePost = createAsyncThunk<Post, UpdatePostPayload>(
  "updatePost",
  async ({ id, putData, isLocal }) => {
    if (isLocal) {
      console.log(id);
      return { id, ...putData } as Post;
    }
    try {
      const { data } = await axios.put<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        putData
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Updating posts error: " + error);
    }
  }
);

export const deletePost = createAsyncThunk<{ id: number }, number>(
  "deletePost",
  async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return { id };
    } catch (error) {
      console.error("Deleting posts error: " + error);
    }
  }
);
