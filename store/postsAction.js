import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("getPosts", async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  } catch (error) {
    console.error("Getting posts error: " + error);
  }
});

export const addPost = createAsyncThunk("addPost", async (postData) => {
  try {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      postData
    );
    return data;
  } catch (error) {
    console.error("Adding posts error: " + error);
  }
});

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ id, putData }) => {
    try {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        putData
      );
      return data;
    } catch (error) {
      console.error("Updating posts error: " + error);
    }
  }
);

export const deletePost = createAsyncThunk("deletePost", async (id) => {
  try {
    const { data } = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return { id };
  } catch (error) {
    console.error("Deleting posts error: " + error);
  }
});
