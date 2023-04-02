import {
  NativeBaseProvider,
  Button,
  Box,
  Heading,
  VStack,
  View,
  Text,
  FlatList,
  Pressable,
  ChevronUpIcon,
  ChevronDownIcon,
  HStack,
  Spacer,
  Image,
  InfoOutlineIcon,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getIdToken } from "../auth/auth";
import { customStyles } from "../../theme/customStyles";
import exerciseMedia from "../../exerciseContent/exerciseMedia";
import { theme } from "../../theme/theme";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useWindowDimensions } from "react-native";
import { REACT_APP_API_URL } from '../../../config';

const ViewWorkoutPlan = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [exerciseGoals, setExerciseGoals] = useState([]);
  const { title, id } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowDimensions();

  const fetchWorkout = async () => {
    setIsLoading(true);
    const idToken = await getIdToken();

    fetch(`${REACT_APP_API_URL}/api/workout/${id}/exercise-goals`, {
        method: 'Get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            setExerciseGoals(res.exerciseGoals);
            console.info('User exercise goals fetched', res);
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => setIsLoading(false));
  };

  const updateWorkout = async () => {
    const idToken = await getIdToken();

    let exerciseGoalIds = [];
    exerciseGoals.forEach((exerciseGoal) =>
      exerciseGoalIds.unshift(exerciseGoal.id)
    );

    fetch(`${REACT_APP_API_URL}/api/workout/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(exerciseGoalIds),
    })
        .then((res) => res.json())
        .then((res) => {
            console.info('Workout plan updated', res);
            navigation.navigate('WorkoutMainPage');
        })
        .catch((err) => {
            console.warn(err);
        });
  };

  const reorderArray = (event) => {
    const movedItem = exerciseGoals.find(
      (item, index) => index === event.oldIndex
    );
    const remainingItems = exerciseGoals.filter(
      (item, index) => index !== event.oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, event.newIndex),
      movedItem,
      ...remainingItems.slice(event.newIndex),
    ];

    return reorderedItems;
  };

  function changeOrder(index, direction) {
    setExerciseGoals(
      reorderArray(
        {
          oldIndex: index,
          newIndex: index + (direction === "UP" ? -1 : 1),
        },
        exerciseGoals
      )
    );
  }

  useEffect(() => {
    fetchWorkout();
  }, [route, refreshing]);

  return (
    <NativeBaseProvider>
      <View style={customStyles.container}>
        <Heading mb={5} color={theme.colors.primary}>
          {title}
        </Heading>
        {isLoading ? (
          <View style={customStyles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.secondary} />
          </View>
        ) : exerciseGoals && exerciseGoals.length > 0 ? (
          <FlatList
            maxH="70%"
            data={exerciseGoals}
            keyExtractor={(exerciseGoal) => exerciseGoal.id}
            refreshing={refreshing}
            onRefresh={fetchWorkout}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("ModifyExercise", {
                    exerciseGoal: item,
                    workoutId: id,
                    workoutTitle: title,
                  })
                }
              >
                <Box
                  minW={350}
                  borderWidth="2"
                  borderColor="coolGray.200"
                  borderRadius={10}
                  p="2"
                  my="2"
                  alignSelf="center"
                >
                  <HStack
                    alignItems="center"
                    alignContent="center"
                    textAlign="center"
                  >
                    <VStack>
                      <Image
                        source={exerciseMedia[item.exerciseInfo.id].picture}
                        alt=""
                        style={styles.exerciseImage}
                      />
                    </VStack>
                    <VStack>
                      <View w={160}>
                        <Text
                          fontSize={
                            item.exerciseInfo.title.length > 19
                              ? Math.round(width / 22)
                              : 18
                          }
                          fontWeight="600"
                        >
                          {item.exerciseInfo.title}
                        </Text>
                      </View>
                      <HStack>
                        <Text>
                          {item.exerciseInfo.exerciseType} -{" "}
                          {item.exerciseInfo.muscleGroup}
                        </Text>
                      </HStack>

                      <HStack mt={1}>
                        <Button
                          backgroundColor={theme.colors.primary}
                          onPress={() => navigation.navigate("ExerciseNav", {screen: "ExerciseDetails" ,
                                params: {page: "" ,id:item.exerciseInfo.id }})}
                        >
                          <HStack>
                            <InfoOutlineIcon
                              mt={1}
                              mr={1}
                              color={theme.colors.secondary}
                            />
                            <Text color={theme.colors.text}>Exercise Info</Text>
                          </HStack>
                        </Button>
                      </HStack>
                    </VStack>
                    <Spacer />
                    <VStack alignSelf="center">
                      <Pressable
                        onPress={() => changeOrder(index, "UP")}
                        style={{
                          borderColor: theme.colors.secondary,
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                          margin: 2,
                        }}
                      >
                        <ChevronUpIcon
                          size={6}
                          color={theme.colors.secondary}
                        />
                      </Pressable>

                      <Pressable
                        onPress={() => changeOrder(index, "DOWN")}
                        style={{
                          borderColor: theme.colors.secondary,
                          borderWidth: 1,
                          padding: 5,
                          borderRadius: 10,
                          margin: 2,
                        }}
                      >
                        <ChevronDownIcon
                          size={6}
                          color={theme.colors.secondary}
                        />
                      </Pressable>
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            )}
          />
        ) : (
          <View style={customStyles.loadingContainer}>
            <Text>Nothing Here Yet</Text>
            <Button
              p="2"
              mb={3}
              variant="outline"
              title="Profile"
              backgroundColor={"transparent"}
              onPress={() =>
                navigation.navigate("ChooseExerciseType", {
                  workoutId: route.params.id,
                  title: route.params.title,
                })
              }
            >
              <Text color={theme.colors.primary} fontWeight={"bold"}>
                <FontAwesome
                  name="plus"
                  color={theme.colors.primary}
                  marginRight={5}
                />
                {"  "}
                ADD NEW EXERCISE
              </Text>
            </Button>
          </View>
        )}

        {exerciseGoals && exerciseGoals.length > 0 ? (
          <Box w="100%">
            <Button
              p="2"
              mt={8}
              mb={3}
              variant="outline"
              title="Run"
              backgroundColor={theme.colors.primary}
              onPress={() =>
                navigation.navigate("RunExercise", {
                  exercises: exerciseGoals,
                })
              }
            >
              <Text color={theme.colors.text}>
                <FontAwesome
                  name="play"
                  color={theme.colors.text}
                  marginRight={5}
                />
                {"  "}
                Run Workout
              </Text>
            </Button>
            <Button
              p="2"
              mb={3}
              variant="outline"
              title="Profile"
              backgroundColor={"transparent"}
              onPress={() =>
                navigation.navigate("ChooseExerciseType", {
                  workoutId: route.params.id,
                  title: route.params.title,
                })
              }
            >
              <Text color={theme.colors.primary} fontWeight={"bold"}>
                <FontAwesome
                  name="plus"
                  color={theme.colors.primary}
                  marginRight={5}
                />
                {"  "}
                ADD NEW EXERCISE
              </Text>
            </Button>
            <Button
              p="2"
              mb={5}
              variant="outline"
              title="Profile"
              onPress={updateWorkout}
              backgroundColor={theme.colors.secondary}
            >
              <Text color={theme.colors.text}>
                <FontAwesome
                  name="upload"
                  color={theme.colors.text}
                  marginRight={5}
                />
                {"  "}Update Workout Plan
              </Text>
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = {
  exerciseImage: {
    maxWidth: 110,
    height: 110,

    marginRight: 20,
  },
  flatList: {
    borderRadius: 10,
  },
};

export default ViewWorkoutPlan;
