import { React, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addPost, updatePost } from "../store/postsAction";
import { useNotification } from "../context/NotificationContext";
import FormInputController from "../controllers/FormInputController";

export default function PostModify({ route, navigation }) {
  const { mode, post } = route.params || {};
  const dispatch = useDispatch();
  const showNotification = useNotification();
  const {
    control,
    handleSubmit,
    setValue,
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
      dispatch(updatePost({ id: post.id, putData: data }));
      showNotification("success", "Успешно выполнено!");
      setTimeout(() => {
        navigation.navigate("PostDetailsScreen", {
          id: post.id,
          title: data.title,
          body: data.body,
        });
      }, 1500);
    } else {
      dispatch(addPost(data));
      showNotification("success", "Успешно выполнено!");
      setTimeout(() => {
        navigation.navigate("StartScreen", { updatedPost: data });
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "flex-start",
    position: "absolute",
    top: 30,
    left: 25,
  },
  textInputsView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },
  buttonView: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "10%",
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
  },
  btnStyle: {
    backgroundColor: "#171515",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    padding: 5,
  },
});
