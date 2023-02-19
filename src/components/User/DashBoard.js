import { useNavigation } from "@react-navigation/native";
import { customStyles } from "../../theme/customStyles";
import {
  NativeBaseProvider,
  VStack,
  Box,
  Button,
  Image,
  Pressable,
  Text,
  ScrollView,
  View,
  HStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import { getUser, getIdToken } from "../auth/auth";
import defaultMaleProfilePic from "../../images/defaultMaleProfilePic.jpg";
import schedule from "../../images/schedule.png";
import groupWorkout from "../../images/groupWorkout.jpg";
import barbelWorkout from "../../images/barbel.jpg";
import { theme } from "../../theme/theme";
import ImageButton from "../Layout/ImageButton";

const Dashboard = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const fetchUser = async () => {
    const userInfo = await getUser();
    const idToken = await getIdToken();

    fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/setting`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.userData);
        console.info("User data fetched", userData);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <NativeBaseProvider>
      <View style={customStyles.container}>
        <VStack>
          <HStack
            style={{
              alignItems: "center",
            }}
          >
            <VStack
              style={{
                left: 1,
                padding: 10,
              }}
            >
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                }}
                source={defaultMaleProfilePic}
              />
            </VStack>
            <VStack
              style={{
                padding: 10,
              }}
            >
              <View style={customStyles.textBox}>
                <Text style={customStyles.text}>
                  Welcome, {userData && userData.username}
                </Text>
              </View>

              <Pressable
                rounded="md"
                w="100px"
                p="2"
                variant="outline"
                title="Profile"
                onPress={() => navigation.navigate("UserProfile")}
                style={{
                  alignItems: "center",
                  backgroundColor: theme.colors.primary,
                }}
              >
                <Text color={theme.colors.text}>Profile</Text>
              </Pressable>
            </VStack>
          </HStack>
        </VStack>

        <ImageButton
          imageSource={barbelWorkout}
          text="WORKOUT"
          onPress={() => navigation.navigate("Workout")}
        />

        <ImageButton
          imageSource={groupWorkout}
          text="SOCIAL"
          onPress={() => navigation.navigate("Social")}
        />

        <ImageButton
          imageSource={schedule}
          text="SCHEDULE"
          onPress={() => navigation.navigate("Schedule")}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default Dashboard;
