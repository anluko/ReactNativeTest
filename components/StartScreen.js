import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Keyboard,
  FlatList,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../context/NotificationContext";
import PostListItem from "./PostListItem";
import { getPosts } from "../store/postsAction";

export default function StartScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const posts = useSelector((state) => state.posts.postsList);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const dispatch = useDispatch();
  const showNotification = useNotification();

  useEffect(() => {
    loadPosts();
  }, [dispatch]);

  const loadPosts = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      const result = await dispatch(getPosts({ page, limit }));

      if (!result) showNotification("error", "Произошла ошибка!");

      if (result.payload.length < limit) {
        setHasMore(false);
      }
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.updatedPost) {
      const updatedPost = route.params.updatedPost;
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setFilteredPosts(updatedPosts);
    }
  }, [route.params?.updatedPost]);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.body.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchText, posts]);

  const renderFooter = () => {
    if (!hasMore) return null;
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#8a8787" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchAreaView}>
        <View style={styles.searchView}>
          <AntDesign name="search1" style={styles.searchIcon} size={24} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={Keyboard.dismiss}
            placeholderTextColor={"grey"}
          />
        </View>
      </View>

      <View style={styles.listView}>
        <FlatList
          data={filteredPosts}
          renderItem={({ item }) => (
            <PostListItem listItem={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            if (!loading && hasMore) loadPosts();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={styles.addPostBtn}
          onPress={() =>
            navigation.navigate("PostModifyScreen", { mode: "create" })
          }
        >
          <Text style={styles.btnText}>New Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchAreaView: {
    backgroundColor: "#343A30",
    alignItems: "center",
    width: "100%",
    height: "13%",
  },
  searchView: {
    marginTop: Platform.OS === "android" ? 60 : 35,
    backgroundColor: "#D7D8D6",
    borderWidth: 1,
    borderRadius: 10,
    color: "black",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    color: "black",
    padding: 10,
  },
  searchInput: {
    fontSize: 18,
    justifyContent: "center",
  },
  listView: {
    padding: 5,
    paddingRight: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#1F201D",
    justifyContent: "center",
  },
  buttonView: {
    backgroundColor: "#ffff",
    width: "100%",
    height: 80,
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
  },
  addPostBtn: {
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
