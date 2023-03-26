import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { customStyles } from "../../theme/customStyles";
import {
  NativeBaseProvider,
  Pressable,
  Text,
  View,
  HStack,
  ScrollView,
} from "native-base";
import { getUser, getIdToken } from "../auth/auth";
import schedule from "../../images/schedule.png";
import groupWorkout from "../../images/groupWorkout.jpg";
import { theme } from "../../theme/theme";
import ImageButton from "../Layout/ImageButton";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import SocialCounterHeader from "../Layout/SocialCounterHeader";
import SmallWorkoutPlanCard from "../Layout/SmallWorkoutPlanCard";

const Dashboard = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [workoutData, setWorkoutData] = useState([]);

  const isFocused = useIsFocused();

  const fetchUser = async () => {
    const userInfo = await getUser();
    const idToken = await getIdToken();

    fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/profile`, {
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
        setWorkoutData(res.workouts);
        console.info("Dashboard data fetched", userData, workoutData);
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
  console.log("this is workoutData\n" + JSON.stringify(workoutData));
  return (
    <NativeBaseProvider>
      <View style={customStyles.container}>
        <HStack>
          <Text style={customStyles.h1}>{userData && userData.username}</Text>

          <Pressable>
            <FontAwesome
              //  name={showFullDescription ? "bell" : "bells"}
              name={"bell"}
              style={{
                color: theme.colors.primary,
                fontSize: 20,
                right: 0,
              }}
            />
          </Pressable>
        </HStack>

        <SocialCounterHeader userData={userData} />

        <View
          backgroundColor={theme.colors.primary}
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
            Workouts for:{" "}
            {moment(
              workoutData && workoutData.length > 0
                ? workoutData[0].schedule
                : undefined
            ).format("dddd MMMM Do")}
          </Text>

          <View
            h={180}
            flexDirection="row"
            backgroundColor={theme.colors.background}
            borderRadius={10}
            padding={2}
            mt={2}
          >
            <ScrollView>
              {workoutData.map((workout, index) => (
                <SmallWorkoutPlanCard
                  key={index}
                  title={workout.title}
                  imageSources={workout.exercises}
                  onPress={() =>
                    navigation.navigate("ViewWorkoutPlan", {
                      id: workout.id,
                      title: workout.title,
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        </View>

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
