import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/postsAction";
import { addComment } from "../store/commentsAction";
import { getComments } from "../store/commentsAction";
import { useForm } from "react-hook-form";
import CommentListItem from "./CommentListItem";
import CommentInputController from "../controllers/CommentInputController";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostDetails({ route, navigation }) {
  const comments = useSelector((state) => state.comments.commentsList);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(route.params.id));
  }, [dispatch, route.params.id]);

  const onSubmit = (data) => {
    const newComment = {
      postId: route.params.id,
      body: data.comment,
      name: "user",
      email: "user@email.ru",
    };
    dispatch(addComment(newComment));
    setValue("comment", "");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(deletePost(route.params.id));
            dispatch(addPost(data));
            showNotification("success", "Успешно выполнено!");
            setTimeout(() => {
              navigation.navigate("StartScreen");
            }, 1500);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image style={styles.image} source={require("../assets/image.png")} />

        <View style={styles.loadInfo}>
          <Text style={styles.title}>{route.params.title}</Text>
          <Text style={styles.body}>{route.params.body}</Text>
        </View>

        <View style={styles.listView}>
          <Text style={styles.commentsText}>{comments.length} comments</Text>
          <View style={styles.commentInputView}>
            <FontAwesome name="comment" size={24} color="black" />
            <View style={styles.inputSendView}>
              <CommentInputController
                style={styles.commentInput}
                control={control}
                name={"comment"}
                placeholder={"Enter comment"}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              <Ionicons
                name="send"
                size={24}
                style={styles.iconSend}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
          {comments.map((comment, index) => (
            <CommentListItem
              key={`${comment.id}-${index}`}
              listItem={comment}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() =>
            navigation.navigate("PostModifyScreen", {
              mode: "update",
              post: route.params,
            })
          }
        >
          <Text style={styles.updateText}>Update Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  loadInfo: {
    alignItems: "stretch",
    width: "100%",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignItems: "left",
    textAlign: "left",
    marginTop: 15,
    paddingHorizontal: 10,
    minHeight: 60,
    flexGrow: 1,
  },
  body: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
    fontWeight: "200",
    paddingHorizontal: 10,
    minHeight: 80,
    lineHeight: 25,
    flexGrow: 1,
  },
  commentInputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
  },
  inputSendView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconSend: {
    marginLeft: "auto",
  },
  listView: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "100%",
    justifyContent: "center",
  },
  commentsText: {
    fontSize: 22,
    fontWeight: "600",
    paddingVertical: 10,
  },
  buttonView: {
    backgroundColor: "#ffff",
    flexDirection: "row",
    width: "100%",
    height: 80,
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 0,
  },
  deleteBtn: {
    backgroundColor: "#9C0D0D",
    height: "80%",
    marginHorizontal: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  updateBtn: {
    backgroundColor: "#171515",
    height: "80%",
    marginHorizontal: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  deleteText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  updateText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
