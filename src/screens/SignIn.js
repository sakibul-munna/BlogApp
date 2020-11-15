import React, { useState } from "react";
import { StyleSheet, View, } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON } from "../functions/AsyncStorageFunction";


const SignIn = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
        <AuthContext.Consumer>
        {(auth) =>(   <View style={styles.viewStyle}>
                <Card>
                    <Card.Title>Welcome to SignIn Screen</Card.Title>
                    <Card.Divider />
                    <Input
                        leftIcon={<MaterialCommunityIcons name="email-edit" size={24} color="black" />}
                        placeholder='E-mail Address'
                        onChangeText= {
                            function(currentInput)
                            {
                                setEmail(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText= {
                            function(currentInput)
                            {
                                setPassword(currentInput);
                            }
                        }
                    />
                    <Button
                        style={styles.buttonStyle}
                        icon={<AntDesign name="login" size={24} color="black" />}
                        title='    Sign In'
                        type='solid'
                        onPress={async function(){
                            let userData = await getDataJSON(Email);
                            if (userData.password == Password){
                                auth.setIsLoggedIn(true);
                                auth.setCurrentUser(userData);
                            }
                            else{
                                alert("LogIn Failed");
                                console.log(userData);
                            }
                        }}
                    />
                    <Button
                        style={styles.buttonStyle}
                        icon={<AntDesign name="user" size={24} color="black" />}
                        title="    Don't Have an Account?"
                        type='clear'
                        onPress={
                            function () {
                                props.navigation.navigate("SignUp");
                            }
                        }

                    />
                </Card>
            </View>)}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 30,
            color: "black"
        },
        viewStyle: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#f2fbff'
        },
        buttonStyle: {
            padding: 10,
            margin: 10,
        }
    }
);

export default SignIn;