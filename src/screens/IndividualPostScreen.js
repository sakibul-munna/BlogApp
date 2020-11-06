import React from 'react';
import { ScrollView, View, StyleSheet, FlatList, ActivityIndicator, } from "react-native";
import { Card, Button, Text, Avatar, Input, Header, } from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign, Entypo } from "@expo/vector-icons";

const IndividualPostScreen = (props) => {
    let info = props.route.params;
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
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
                    <Text style={styles.textstyle}>
                        0 Likes, 0 Comments.
                        </Text>
                    <Card.Divider />
                    <Input
                        placeholder="  Write Something!"
                        leftIcon={<Entypo name="pencil" size={24} color="black"
                            style={styles.inputStyle}
                            multiline={true}
                        />
                        }
                    />
                    <View style={styles.buttonStyle}>
                        <Button title="Comment" color="#50a8e0" type="outline" onPress={
                            function () {

                            }
                        } />
                    </View>
                </View>
            )
            }
        </AuthContext.Consumer >
    );
}

const styles = StyleSheet.create({
    textstyle: {
        margin: 10,
        marginLeft: 20,
        paddingBottom: 10,
        fontSize: 36,
    },
    buttonStyle: {
        paddingTop:5,
        marginLeft:100,
        marginRight:100,
        fontSize: 20,
    },
    inputStyle: {

        marginHorizontal: 20,
        marginTop: 10,
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

export default IndividualPostScreen; 