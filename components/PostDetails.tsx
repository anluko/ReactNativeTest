import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/postsAction";
import { addComment } from "../store/commentsAction";
import { getComments } from "../store/commentsAction";
import { useForm } from "react-hook-form";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { useNotification } from "../context/NotificationContext";
import { aligned } from "../utils/responsive";
import CommentListItem from "./CommentListItem";
import CommentInputController from "../controllers/CommentInputController";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PostDetailsProps {
  route: {
    params: {
      id: number;
      title: string;
      body: string;
    };
  };
  navigation: any;
}

export default function PostDetails({ route, navigation }: PostDetailsProps) {
  const comments = useSelector(
    (state: RootState) => state.comments.commentsList
  );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch<AppDispatch>();
  const showNotification = useNotification().showNotification;

  useEffect(() => {
    dispatch(getComments(route.params.id));
  }, [dispatch, route.params.id]);

  const onSubmit = (data) => {
    if (!data.comment || data.comment.trim() === "") {
      showNotification("error", "Please input text!");
      return;
    }

    const newComment = {
      postId: route.params.id,
      body: data.comment,
      name: "user",
      email: "user@email.ru",
    };

    console.log(newComment);
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
            showNotification("success", "Successfully deleted!");
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
    paddingBottom: aligned(100),
  },
  loadInfo: {
    alignItems: "stretch",
    width: "100%",
    paddingHorizontal: aligned(10),
  },
  image: {
    width: "100%",
    height: aligned(250),
  },
  title: {
    fontSize: aligned(28),
    fontWeight: "bold",
    textAlign: "left",
    marginTop: aligned(15),
    paddingHorizontal: aligned(10),
    minHeight: aligned(60),
    flexGrow: 1,
  },
  body: {
    fontSize: aligned(18),
    textAlign: "left",
    marginTop: aligned(20),
    fontWeight: "200",
    paddingHorizontal: aligned(10),
    minHeight: aligned(80),
    lineHeight: aligned(25),
    flexGrow: 1,
  },
  commentInputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    marginBottom: aligned(10),
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
    paddingVertical: aligned(20),
    paddingHorizontal: aligned(15),
    width: "100%",
    justifyContent: "center",
  },
  commentsText: {
    fontSize: aligned(22),
    fontWeight: "600",
    paddingVertical: aligned(10),
  },
  buttonView: {
    backgroundColor: "#ffff",
    flexDirection: "row",
    width: "100%",
    height: aligned(80),
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: aligned(0),
  },
  deleteBtn: {
    backgroundColor: "#9C0D0D",
    height: "80%",
    marginHorizontal: aligned(15),
    paddingHorizontal: aligned(25),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: aligned(15),
  },
  updateBtn: {
    backgroundColor: "#171515",
    height: "80%",
    marginHorizontal: aligned(15),
    paddingHorizontal: aligned(25),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: aligned(15),
  },
  deleteText: {
    fontSize: aligned(18),
    textAlign: "center",
    color: "white",
  },
  updateText: {
    fontSize: aligned(18),
    textAlign: "center",
    color: "white",
  },
});
