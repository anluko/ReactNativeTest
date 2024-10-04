import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { Post } from "../interfaces/Post"
import { aligned } from "../utils/responsive";

interface PostListItemProps {
  listItem: Post;
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const PostListItem: React.FC<PostListItemProps> = ({ listItem, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.touchItem}
      onPress={() => {
        navigation.navigate("PostDetailsScreen", listItem);
      }}
    >
      <View style={styles.itemsView}>
        <Image
          style={styles.image}
          source={require("../assets/image.png")}
          onError={(e) => console.log("Image load error", e.nativeEvent.error)}
        />

        <View style={styles.nameAnons}>
          <Text style={styles.title}>{listItem.title}</Text>
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
    marginBottom: aligned(10),
    backgroundColor: "white",
    paddingHorizontal: aligned(20),
    paddingLeft: aligned(10),
    padding: aligned(10),
    overflow: "hidden",
    marginHorizontal: aligned(10),
  },
  image: {
    width: "100%",
    height: aligned(200),
  },
  nameAnons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: aligned(15),
  },
  title: {
    fontSize: aligned(20),
    textAlign: "left",
    color: "#474747",
  },
});

export default PostListItem;
