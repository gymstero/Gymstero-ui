import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { customStyles } from "../../theme/customStyles";
import {
  NativeBaseProvider,
  VStack,
  Image,
  Pressable,
  Text,
  View,
  HStack,
  ScrollView,
  Divider,
} from "native-base";
import { getUser, getIdToken } from "../auth/auth";
import schedule from "../../images/schedule.png";
import groupWorkout from "../../images/groupWorkout.jpg";
import barbelWorkout from "../../images/barbel.jpg";
import { theme } from "../../theme/theme";
import ImageButton from "../Layout/ImageButton";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import SocialCounterHeader from "../Layout/SocialCounterHeader";
import SmallWorkoutPlanCard from "../Layout/SmallWorkoutPlanCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Dashboard = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});

  const isFocused = useIsFocused();

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
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);
  /*
  const [notification, notificationSet] = useState({});

  function notificationSet(initialState) {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
  }
  */
  return (
    <NativeBaseProvider>
      <View style={customStyles.container}>
        <HStack>
          <Text style={customStyles.h1}>{userData && userData.username}</Text>

          <Pressable>
            <FontAwesome
              //  name={showFullDescription ? "bell" : "bells"}
              name={"bell"}
              style={{ color: theme.colors.primary, fontSize: 20, right: 0 }}
            />
          </Pressable>
        </HStack>

        <SocialCounterHeader userData={userData} />

        <View
          //  w={"100%"}
          //  h={250}
          backgroundColor={theme.colors.primary}
          // backgroundColor={"#01070C"}
          // borderColor={theme.colors.primary}
          borderColor={theme.colors.secondary}
          p={3}
          borderWidth={0}
          borderRadius={10}
          alignItems="center"
        >
          <Text
            color={theme.colors.text}
            fontSize={21}
            fontWeight={"bold"}
            mb={2}
          >
            Workouts for: <>{moment().format("dddd MMMM Do")}</>
          </Text>

          <View
            h={180}
            backgroundColor={theme.colors.background}
            borderRadius={10}
            padding={2}
            mt={2}
          >
            <ScrollView>
              <SmallWorkoutPlanCard
                title={"Morning Routine"}
                imageSources={[
                  "9hn6zh5wncHfo05ontbq",
                  "A31gG4qQGQIbH4esLvIY",
                  "z3VmcvWKwPk96Lu7SvsE",
                  "DKNZso4okyMFR4HPSBVj",
                ]} // you can pass exercise array ex: imageSources={item.exercises}
                onPress={() =>
                  navigation.navigate("ViewWorkoutPlan", {
                    // id: item.id,
                    // title: item.title,

                    id: "qcxdQmiKJqWHEX2j7CVu",
                    title: "Morning Routine",
                  })
                }
              />

              <SmallWorkoutPlanCard />
              <SmallWorkoutPlanCard />
              <SmallWorkoutPlanCard />
              <SmallWorkoutPlanCard />
            </ScrollView>
          </View>
        </View>

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
