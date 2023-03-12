import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  VStack,
  NativeBaseProvider,
  Box,
  FormControl,
  Input,
  HStack,
  Heading,
  Spinner,
  Text,
} from "native-base";
import { useEffect, useState } from "react";
import { theme } from "../../theme/theme";
import { getIdToken } from "../auth/auth";

const ModifyExercise = () => {
  const [exercise, setExercise] = useState({});
  const navigation = useNavigation();
  const route = useRoute();

  const updateExercise = async () => {
    const idToken = await getIdToken();
    const { exerciseInfo, ...exerciseGoal } = exercise;

    fetch(`http://10.0.2.2:8080/api/workout/exercise-goal/${exercise.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(exerciseGoal),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("Exercise goal updated", res);
        navigation.navigate("ViewWorkoutPlan", {
          id: route.params.workoutId,
          title: route.params.workoutTitle,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const deleteExercise = async (exerciseGoalId) => {
    const idToken = await getIdToken();

    fetch(
      `http://10.0.2.2:8080/api/workout/${route.params.workoutId}/exercise-goal/${exerciseGoalId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.info("Exercise goal deleted", res);
        navigation.navigate("ViewWorkoutPlan", {
          id: route.params.workoutId,
          title: route.params.workoutTitle,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    setExercise(route.params.exerciseGoal);
    console.log("ROUTE PARAMS", exercise.exerciseInfo, exercise.id);
  }, []);

  return (
    <NativeBaseProvider flex={1}>
      <VStack direction="column" mt="100" space={10}>
        {exercise.exerciseInfo ? (
          <Box alignItems="center">
            <Heading>
              Modify&nbsp;
              {exercise.exerciseInfo.title}
            </Heading>
            <FormControl isInvalid w="85%" maxW="350px" mb="5">
              <FormControl.Label>Target Sets</FormControl.Label>
              <Input
                placeholder="Enter Target Set"
                value={exercise.targetSets}
                onChangeText={(text) =>
                  setExercise({
                    ...exercise,
                    targetSets: text,
                  })
                }
              />
              <FormControl.Label>Target Reps</FormControl.Label>
              <Input
                placeholder="Enter Target Reps"
                value={exercise.targetReps}
                onChangeText={(text) =>
                  setExercise({
                    ...exercise,
                    targetReps: text,
                  })
                }
              />
              <FormControl.Label>Target Weight - kg</FormControl.Label>
              <Input
                placeholder="Enter Weight"
                value={exercise.targetWeight}
                onChangeText={(text) =>
                  setExercise({
                    ...exercise,
                    targetWeight: text,
                  })
                }
              />
              <FormControl.Label>Estimated Time - mins</FormControl.Label>
              <Input
                placeholder="Enter Estimated Time"
                value={exercise.estimatedTime}
                onChangeText={(text) =>
                  setExercise({
                    ...exercise,
                    estimatedTime: text,
                  })
                }
              />
              <FormControl.Label>Comment</FormControl.Label>
              <Input
                placeholder="Enter comment"
                value={exercise.comment}
                onChangeText={(text) =>
                  setExercise({
                    ...exercise,
                    comment: text,
                  })
                }
              />
            </FormControl>
            <HStack>
              <VStack p="2">
                <Button
                  w={40}
                  backgroundColor={theme.colors.primary}
                  onPress={updateExercise}
                >
                  <Text color={theme.colors.text}>Update</Text>
                </Button>
              </VStack>

              <VStack p="2">
                <Button
                  w={40}
                  onPress={() => deleteExercise(exercise.id)}
                  backgroundColor={theme.colors.secondary}
                >
                  <Text color={theme.colors.text}>Delete</Text>
                </Button>
              </VStack>
            </HStack>
          </Box>
        ) : (
          <Spinner size="lg" />
        )}
      </VStack>
    </NativeBaseProvider>
  );
};

export default ModifyExercise;
