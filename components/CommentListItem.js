import React, { useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";

export default function CommentListItem({ listItem, navigation }) {
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
    borderRadius: 15,
    marginTop: 10,
  },
  itemsView: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "white",
    overflow: "hidden",
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  nameAnons: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    textAlignVertical: "top",
  },
  body: {
    fontSize: 14,
    textAlign: "left",
  },
});
