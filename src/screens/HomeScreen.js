import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList, ActivityIndicator, } from "react-native";
import { Card, Button, Text, Avatar, Input, Header, } from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { addPostJSON, getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunction";
import { LogBox } from 'react-native';

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [recentPost, setRecentPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postNo, setPostNo] = useState(0);
  const [postDate, setPostDate] = useState("");
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const loadPosts = async () => {
    setLoading(true);
    let temp_posts = await getDataJSON("Posts");
    setPosts(temp_posts);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  if (!loading) {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Header
              leftComponent={{
                icon: "menu",
                color: "#fff",
                onPress: function () {
                  props.navigation.toggleDrawer();
                },
              }}
              centerComponent={{ text: "The Office", style: { color: "#fff" } }}
              rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: function () {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                },
              }}
            />
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={
                  function (currentPost) {
                    setRecentPost(currentPost);
                  }
                }
              />
              <Button title="Post" type="outline" onPress={function () {
                setLoading(true);
                setPostNo(postNo + 1);
                var date = new Date().getDate(); //Current Date
                var month = monthNames[new Date().getMonth()]; //Current Month
                var year = new Date().getFullYear();
                setPostDate(date + ' ' + month + ' ' + year);
                console.log(postDate);
                let postDetail = {
                  ID: postNo,
                  author: auth.CurrentUser.name,
                  body: recentPost,
                  created_at: "Posted On " + postDate,
                  likes: [],
                  comments: []
                }
                if (posts == undefined) {
                  setPosts([postDetail]);
                  storeDataJSON('Posts', [postDetail]);
                } else {
                  setPosts([...posts, postDetail]);
                  addPostJSON('Posts', postDetail);
                }
                setLoading(false);
              }} />
            </Card>

            <FlatList
              data={posts}
              inverted={true}
              scrollsToTop={true}
              keyExtractor={(item) => item.ID}
              renderItem={function ({ item }) {
                return (
                  <PostCard
                    author={item.author}
                    title={item.created_at}
                    body={item.body}
                    navigation={props.navigation}
                    post={item}
                  />
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#f2fbff'
  },
});

export default HomeScreen;