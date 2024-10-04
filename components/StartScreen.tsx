import React, { useEffect, useState } from "react";
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
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { Post } from "../interfaces/Post";
import { aligned } from "../utils/responsive";

interface StartScreenProps {
  route: {
    params: {
      updatedPost?: Post;
    };
  };
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const StartScreen: React.FC<StartScreenProps> = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const posts = useSelector((state: RootState) => state.posts.postsList);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 5;

  const dispatch = useDispatch<AppDispatch>();
  const showNotification = useNotification().showNotification;

  useEffect(() => {
    if (posts.length === 0) loadPosts();
    else setFilteredPosts(posts);
  }, [dispatch]);

  const loadPosts = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      const result = await dispatch(getPosts({ page, limit }));

      if (!result) showNotification("error", "Произошла ошибка!");

      const payload = result.payload as Post[];
      if (payload.length < limit) {
        setHasMore(false);
      }

      const combinedPosts = [...posts, ...payload];
      setFilteredPosts(combinedPosts);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.updatedPost) {
      const updatedPost: Post = route.params.updatedPost;
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setFilteredPosts(updatedPosts);
    } else {
      setFilteredPosts(posts);
    }
  }, [route.params?.updatedPost, posts]);

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

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyText}>No results</Text>
      </View>
    );
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
            onChangeText={setSearchText}
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
          keyExtractor={(item) => `post-${item.id}`}
          onEndReached={() => {
            if (!loading && hasMore) loadPosts();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyList}
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
};

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
    height: Platform.OS === "android" ? aligned(120) : aligned(90),
  },
  searchView: {
    marginTop: Platform.OS === "android" ? aligned(60) : aligned(35),
    backgroundColor: "#D7D8D6",
    borderWidth: 1,
    borderRadius: aligned(10),
    color: "black",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    color: "black",
    padding: aligned(10),
  },
  searchInput: {
    fontSize: aligned(18),
    justifyContent: "center",
  },
  listView: {
    padding: 5,
    paddingRight: aligned(10),
    width: "100%",
    height: "100%",
    backgroundColor: "#1F201D",
    justifyContent: "center",
  },
  buttonView: {
    backgroundColor: "#ffff",
    width: "100%",
    height: aligned(80),
    position: "absolute",
    justifyContent: "center",
    bottom: aligned(0),
  },
  addPostBtn: {
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
    padding: 5,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    padding: aligned(10),
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: aligned(18),
    textAlign: "center",
    color: "white",
  },
});

export default StartScreen;
