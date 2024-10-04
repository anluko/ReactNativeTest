import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addPost, updatePost } from "../store/postsAction";
import { useNotification } from "../context/NotificationContext";
import { Post } from "../interfaces/Post";
import { AppDispatch, RootState } from "../store/store";
import { aligned } from "../utils/responsive";
import uuid from "react-native-uuid";
import FormInputController from "../controllers/FormInputController";

interface PostModifyProps {
  route: {
    params: {
      mode: "create" | "update";
      post?: Post;
    };
  };
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const PostModify: React.FC<PostModifyProps> = ({ route, navigation }) => {
  const { mode, post } = route.params || {};
  const postsList = useSelector((state: RootState) => state.posts.postsList);
  const dispatch = useDispatch<AppDispatch>();
  const showNotification = useNotification().showNotification;
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (mode === "update" && post) {
      setValue("title", post.title);
      setValue("body", post.body);
    }
  }, [mode, post, setValue]);

  const onSubmit = (data) => {
    if (mode === "update") {
      const isLocal = post?.isLocal || false;
      dispatch(updatePost({ id: post.id, putData: data, isLocal }));
      showNotification("success", "Successfully updated!");
      setTimeout(() => {
        navigation.navigate("PostDetailsScreen", {
          id: post.id,
          title: data.title,
          body: data.body,
        });
      }, 1500);
    } else {
      const newPost = {
        ...data,
        isLocal: true,
        userId: 1,
      };
      dispatch(addPost(newPost));

      showNotification("success", "Successfully added!");
      setTimeout(() => {
        navigation.navigate("StartScreen", { updatedPost: newPost });
      }, 1500);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.infoText}>
          {mode === "update" ? "Update Post" : "Create Post"}
        </Text>

        <View style={styles.textInputsView}>
          <FormInputController
            control={control}
            name={"title"}
            placeholder={"Title"}
          />
          <FormInputController
            control={control}
            name={"body"}
            placeholder={"Decription"}
          />
        </View>

        <View style={styles.buttonView}>
          <Pressable style={styles.btnStyle} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>
              {mode === "update" ? "Update" : "Create"}
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: aligned(26),
    fontWeight: "bold",
    alignSelf: "flex-start",
    position: "absolute",
    top: aligned(30),
    left: aligned(25),
  },
  textInputsView: {
    padding: aligned(20),
    width: "100%",
    justifyContent: "center",
  },
  buttonView: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "10%",
    position: "absolute",
    justifyContent: "center",
    bottom: aligned(20),
  },
  btnStyle: {
    backgroundColor: "#171515",
    borderRadius: aligned(15),
    borderWidth: 1,
    paddingVertical: aligned(10),
    marginHorizontal: aligned(15),
  },
  btnText: {
    fontSize: aligned(18),
    color: "white",
    textAlign: "center",
  },
});

export default PostModify;
