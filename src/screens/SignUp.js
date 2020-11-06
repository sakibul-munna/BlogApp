import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Input, Button, Card, Text } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { storeDataJSON } from "../functions/AsyncStorageFunction";
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [Birthday, setBirthday] = useState("");
    const [Address, setAddress] = useState('');
    const [Work, setWork] = useState("");

    return (
        <View style={styles.viewStyle}>
            <Card>
                <Card.Title style={styles.textStyle}>Welcome to SignUP Screen</Card.Title>
                <Card.Divider />
                <Input
                    leftIcon={<MaterialIcons name="person" size={24} color="black" />}
                    placeholder='Name'
                    onChangeText={
                        function (currentInput) {
                            setName(currentInput);
                        }
                    }
                />

                <Input
                    leftIcon={<MaterialCommunityIcons name="school" size={24} color="black" />}
                    placeholder='Student ID'
                    onChangeText={
                        function (currentInput) {
                            setSID(currentInput);
                        }
                    }
                />

                <Input
                    leftIcon={<MaterialCommunityIcons name="email-edit" size={24} color="black" />}
                    placeholder='E-mail'
                    onChangeText={
                        function (currentInput) {
                            setEmail(currentInput);
                        }
                    }
                />

                <Input
                    leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
                    placeholder='Password'
                    onChangeText={
                        function (currentInput) {
                            setPassword(currentInput);
                        }
                    }
                />

                <Input
                    leftIcon={<MaterialIcons name="place" size={24} color="black" />}
                    placeholder='Address'
                    onChangeText={
                        function (currentInput) {
                            setAddress(currentInput);
                        }
                    }
                />

                <Input
                    leftIcon={<MaterialIcons name="work" size={24} color="black" />}
                    placeholder='Work'
                    onChangeText={
                        function (currentInput) {
                            setWork(currentInput);
                        }
                    }
                />

                <View>
                    <View style={styles.viewStyle2}>

                        <Button icon={<MaterialIcons name="date-range" size={24} color="black" />}
                            style={styles.buttonStyle2} type="outline" color='blue' onPress={
                                function () {
                                    setShow(true)
                                }} title="  Select Your Birthday" />
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="calendar"
                            onChange={function (event, selectedDate) {
                                setShow(false);
                                setDate(selectedDate);
                                let str = selectedDate.toString();
                                str = str.slice(4, 16)
                                alert(str);
                                setBirthday(str);
                            }
                            }
                        />
                    )}
                </View>

                <Button
                    style={styles.buttonStyle}
                    icon={<AntDesign name="user" size={24} color="black" />}
                    title='  Sign Up'
                    type='solid'
                    onPress={
                        function () {
                            let currentUser = {
                                name: Name,
                                sId: SID,
                                email: Email,
                                password: Password,
                                birthday: Birthday,
                                address: Address,
                                work: Work
                            };
                            storeDataJSON(Email, currentUser);
                            props.navigation.navigate("SignIn");
                        }
                    }
                />
                <Button
                    style={styles.buttonStyle}
                    icon={<AntDesign name="login" size={24} color="black" />}
                    title="   Already Have an Account?"
                    type='clear'
                    onPress={
                        function () {
                            props.navigation.navigate("SignIn");
                        }
                    }

                />
            </Card>
        </View>
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
        viewStyle2: {
            justifyContent: 'flex-start',
            margin: 10,
            paddingBottom: 10
        },
        buttonStyle: {
            padding: 10,
            margin: 10,
        },
        buttonStyle2: {
            marginRight: 100,
            borderColor: "white"
        },
        title: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
    }
);

export default SignUp;