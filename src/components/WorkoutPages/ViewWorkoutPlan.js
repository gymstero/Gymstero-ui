import {
  NativeBaseProvider,
  Button,
  Box,
  Heading,
  VStack,
  Center,
  Text,
  FlatList,
  Pressable,
  ChevronUpIcon,
  ChevronDownIcon,
  HStack,
  Spacer,
  Image,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getIdToken } from "../auth/auth";
import exerciseMedia from "../../exerciseContent/exerciseMedia";
import { theme } from "../../theme/theme";
import { FontAwesome } from "@expo/vector-icons";

const ViewWorkoutPlan = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [exerciseGoals, setExerciseGoals] = useState([]);
  const { title, id } = route.params;

  const fetchWorkout = async () => {
    const idToken = await getIdToken();

    fetch(`http://10.0.2.2:8080/api/workout/${id}/exercise-goals`, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setExerciseGoals(res.exerciseGoals);
        console.info("User exercise goals fetched", res);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => setRefreshing(false));
  };

  const updateWorkout = async () => {
    const idToken = await getIdToken();

    let exerciseGoalIds = [];
    exerciseGoals.forEach((exerciseGoal) =>
      exerciseGoalIds.unshift(exerciseGoal.id)
    );

    fetch(`http://10.0.2.2:8080/api/workout/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(exerciseGoalIds),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("Workout plan updated", res);
        navigation.navigate("WorkoutMainPage");
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
    <NativeBaseProvider flex={1}>
      <VStack alignItems="center" backgroundColor={"white"}>
        <Heading mb={5} color={"black"}>
          {title}
        </Heading>
        {exerciseGoals && exerciseGoals.length > 0 ? (
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
                      <Text fontSize="lg" fontWeight="600">
                        {item.exerciseInfo.title}
                      </Text>
                      <Text>
                        {item.exerciseInfo.exerciseType} -{" "}
                        {item.exerciseInfo.muscleGroup}
                      </Text>
                    </VStack>
                    <Spacer />
                    <VStack alignSelf="center">
                      <ChevronUpIcon
                        color={theme.colors.secondary}
                        onPress={() => changeOrder(index, "UP")}
                      />
                      <ChevronDownIcon
                        color={theme.colors.secondary}
                        onPress={() => changeOrder(index, "DOWN")}
                      />
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            )}
          />
        ) : (
          <Text style={styles.title}>Nothing Here Yet</Text>
        )}

        <Box w="85%">
          {exerciseGoals && exerciseGoals.length > 0 ? (
            <Button
              w="100%"
              p="2"
              mt={3}
              mb={2}
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
          ) : (
            <></>
          )}
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

          {exerciseGoals && exerciseGoals.length > 0 ? (
            <Button
              w="100%"
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
          ) : (
            <></>
          )}
        </Box>
      </VStack>
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
