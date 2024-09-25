import React, { useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";

export default function PostListItem({ listItem, navigation }) {
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
    borderRadius: 15,
    marginTop: 10,
  },
  itemsView: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingLeft: 10,
    padding: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  nameAnons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    color: "#474747",
  },
});
