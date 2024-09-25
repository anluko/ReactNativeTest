import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";

export const getComments = createAsyncThunk("getComments", async (postId) => {
  //const showNotification = useNotification();

  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return data;
  } catch (error) {
    //showNotification("error", "Произошла ошибка!");
    console.error("Getting comment error: " + error);
  }
});

export const addComment = createAsyncThunk("addComment", async (postData) => {
  //const showNotification = useNotification();

  try {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/comments",
      postData
    );

    return data;
  } catch (error) {
    //showNotification("error", "Произошла ошибка!");
    console.error("Adding comment error: " + error);
  }
});
