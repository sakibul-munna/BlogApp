import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Text, Card, Button, Avatar, Header, Icon } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { removeData } from "../functions/AsyncStorageFunction";
import UploadPhoto from "../components/UploadPhoto";
const ProfileScreen = (props) => {
  console.log(props);
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.mainViewStyle}>
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
          <View style={styles.viewStyle2}>
          <UploadPhoto props={props} />
            <Text style={styles.textStyle2}>
              {auth.CurrentUser.name}
            </Text>
            <Button
              title={' Delete Profile '}
              onPress={function () {
                let key = auth.CurrentUser.email;
                removeData(key);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
                alert("Profile Deleted");
              }}
            />
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="school" type='MaterialCommunityIcons' color="#777777" size={30} />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.sId}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" type='MaterialCommunityIcons' color="#777777" size={30} />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.email}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="place" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.address}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="date-range" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.birthday}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="work" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.work}</Text>
            </View>
          </View>

        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  textStyle2: {
    padding: 20,
    fontSize: 30,
    color: "#162f3e",
    fontStyle: 'normal'
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: '#f2fbff'
  },
  viewStyle2: {
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
  },
  userInfoSection: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    margin: 10,
    padding: 10
  },
});

export default ProfileScreen;