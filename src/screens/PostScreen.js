import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from "react-native";
import { Card, Button, Text, FlatList, Avatar, ActivityIndicator, Input, Header, SafeAreaView } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import { storeDataJSON, addDataJSON, getDataJSON } from '../functions/AsyncStorageFunction';
import CommentCard from "../components/CommentCard";
import moment from "moment";

const PostScreen = (props) => {
    let info = props.route.params;
    const [currentComment, setcurrentComment] = useState('');
    const [allComments, setallComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [postComments, setPostComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const input = React.createRef();

    const loadComments = async () => {
        setLoading(true);
        let allcomments = await getDataJSON('Comments');
        setComments(allcomments);
        if (allcomments != null) {
            setPostComments(allcomments.filter((el) => el.postid == info.postid));
        } else {
            setPostComments([]);
        }
    };

    useEffect(() => {
        loadComments();
    }, []);

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
                        centerComponent={{ text: "Somewhere In Blog", style: { color: "#fff" } }}
                        rightComponent={{
                            icon: "lock-outline",
                            color: "#fff",
                            onPress: function () {
                                auth.setIsLoggedIn(false);
                                auth.setCurrentUser({});
                            },
                        }}
                    />
                    <Card style={styles.cardStyle}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                containerStyle={{ backgroundColor: "#ffab91" }}
                                rounded
                                icon={{ name: "user", type: "font-awesome", color: "black" }}
                                activeOpacity={1}
                            />
                            <Text h4Style={{ padding: 10 }} h4>
                                {info.author}
                            </Text>
                        </View>
                        <Text style={{ fontStyle: "italic" }}> {info.created_at}</Text>
                        <Text
                            style={{
                                paddingVertical: 10,
                            }}
                        >
                            {info.body}
                        </Text>
                    </Card>
                    <Text style={styles.textstyle}>0 Likes, 0 Comments.</Text>

                    <Card.Divider />
                    <Input
                        ref={input}
                        clearButtonMode={'always'}
                        placeholder="  Write Something!"
                        leftIcon={<Entypo name="pencil" size={24} color="black" />}
                        style={styles.inputStyle}
                        multiline={true}
                        onChangeText={
                            function (comment) {
                                setcurrentComment(comment);
                            }
                        }
                    />
                    <View style={styles.buttonStyle}>
                        <Button title="Comment" color="#50a8e0" type="outline" onPress={
                            function () {
                                setLoading(true);
                                let flag = 0;
                                if (allComments == undefined) {
                                    flag = 1;
                                }
                                else {
                                    flag = allComments.length + 1;
                                }

                                if (currentComment != '') {
                                    let newcomment = {
                                        post_ID: info.post_ID,
                                        comment_ID: flag,
                                        author: info.author,
                                        time: moment().format('DD MMM, YYYY'),
                                        body: currentComment,
                                    };
                                    if (postComments == undefined) {
                                        setPostComments([newcomment]);
                                    } else {
                                        setPostComments([...postComments, newcomment]);
                                    }
                                    if (allComments == undefined) {
                                        setallComments([newcomment]);
                                        storeDataJSON('Comments', [newcomment]);
                                    } else {
                                        setallComments([...allComments, newcomment]);
                                        addDataJSON('Comments', newcomment);
                                    }
                                }
                                input.current.clear();
                                setcurrentComment('');
                            }
                        }
                        />
                    </View>
                    <SafeAreaView style={flex = 1}>
                        <FlatList
                            data={postComments}
                            scrollsToTop={true}
                            keyExtractor={(item) => item.comment_ID}
                            renderItem={function ({ item }) {
                                return (
                                    <CommentCard
                                        author={item.author}
                                        time={item.time}
                                        body={item.body}
                                    />
                                );
                            }}
                        />
                    </SafeAreaView>
                </View>
            )}
        </AuthContext.Consumer>
    )
}
const styles = StyleSheet.create({
    textstyle: {
        margin: 10,
        marginLeft: 20,
        paddingBottom: 10,
        fontSize: 36,
    },
    buttonStyle: {
        paddingTop: 5,
        marginLeft: 100,
        marginRight: 100,
        fontSize: 20,
    },
    inputStyle: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 2
    },
    view2Style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewStyle: {
        flex: 1,
    },
    mainviewStyle: {
        flex: 1,
        borderRadius: 10,
        borderBottomWidth: 20,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: 'transparent',
    },
});


export default PostScreen;