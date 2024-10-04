import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { Comment } from "../interfaces/Comment"
import { aligned } from "../utils/responsive";

interface CommentListItemProps {
  listItem: Comment;
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const CommentListItem: React.FC<CommentListItemProps> = ({ listItem, navigation }) => {
  return (
    <TouchableOpacity style={styles.touchItem}>
      <View style={styles.itemsView}>
        <Image
          style={styles.image}
          source={require("../assets/user.png")}
          onError={(e) => console.log("Image load error", e.nativeEvent.error)}
        />

        <View style={styles.nameAnons}>
          <Text style={styles.title}>{listItem.email}</Text>
          <Text style={styles.body}>{listItem.body}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchItem: {
    justifyContent: "center",
    borderRadius: aligned(15),
    marginTop: aligned(10),
  },
  itemsView: {
    width: "100%",
    flexDirection: "row",
    marginBottom: aligned(10),
    backgroundColor: "white",
    overflow: "hidden",
    paddingVertical: aligned(10),
  },
  image: {
    width: aligned(60),
    height: aligned(60),
  },
  nameAnons: {
    flex: 1,
    paddingLeft: aligned(10),
  },
  title: {
    fontSize: aligned(18),
    fontWeight: "500",
    textAlignVertical: "top",
  },
  body: {
    fontSize: aligned(14),
    textAlign: "left",
  },
});

export default CommentListItem;