import { useNavigation } from "@react-navigation/native";
import { HStack, VStack, Image, Text, Pressable } from "native-base";
import React from "react";
import { theme } from "../../theme/theme";

const SocialCounterHeader = ({ userData }) => {
  const navigation = useNavigation();

  const getFollowingUserCount = (following) => {
    return following ? following.length : 0;
  };

  const getWorkoutCount = (workouts) => {
    return workouts ? workouts.length : 0;
  };

  return (
    <HStack alignItems="center">
      <VStack p={2}>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
            source={{
              uri:
                (userData && userData.photoURL) ||
                "https://img.icons8.com/ios-glyphs/90/000000/user--v1.png",
            }}
            alt="user profile"
          />
        </Pressable>
      </VStack>
      <VStack>
        <HStack
          style={{
            alignItems: "center",
            textAlign: "center",
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
          }}
        >
          <Pressable
            m="3"
            ml="4"
            alignItems="center"
            variant="outline"
            title="Posts"
            onPress={() => navigation.navigate("Social")}
          >
            <Text color={theme.colors.text}>
              {userData ? getWorkoutCount(userData.workouts) : 0}
            </Text>
            <Text color={theme.colors.text}>Workout</Text>
          </Pressable>
          <Pressable
            m="3"
            ml="3"
            alignItems="center"
            variant="outline"
            title="Followers"
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Text color={theme.colors.text}>
              {userData && userData.numOfFollowers}
            </Text>
            <Text color={theme.colors.text}>Followers</Text>
          </Pressable>
          <Pressable
            m="3"
            mr={4}
            alignItems="center"
            variant="outline"
            title="Following"
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Text color={theme.colors.text}>
              {userData ? getFollowingUserCount(userData.following) : 0}
            </Text>
            <Text color={theme.colors.text}>Following</Text>
          </Pressable>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default SocialCounterHeader;
