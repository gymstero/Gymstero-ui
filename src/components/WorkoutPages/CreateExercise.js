import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  VStack,
  NativeBaseProvider,
  Text,
  Box,
  FormControl,
  Input,
  ScrollView,
} from "native-base";
import { useState } from "react";
import { REACT_APP_API_URL } from '../../../config';
import { customStyles } from "../../theme/customStyles";
import { theme } from "../../theme/theme";
import { getIdToken } from "../auth/auth";

const CreateExercise = () => {
  const [exercise, SetExercise] = useState({
    exerciseId: "",
    targetSets: "",
    targetReps: "",
    targetWeight: "",
    estimatedTime: "",
    comment: "",
  });
  const navigation = useNavigation();
  const route = useRoute();

  const submitExercise = async () => {
    const idToken = await getIdToken();

    fetch(
        `${REACT_APP_API_URL}/api/workout/${route.params.workoutId}/exercise-goal`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
                exerciseId: route.params.id,
                targetSets: exercise.targetSets,
                targetReps: exercise.targetReps,
                targetWeight: exercise.targetWeight,
                estimatedTime: exercise.estimatedTime,
                comment: exercise.comment,
            }),
        }
    )
        .then((res) => res.json())
        .then((res) => {
            console.info('Exercise goal posted', res);
            navigation.navigate('ViewWorkoutPlan', {
                id: route.params.workoutId,
                title: route.params.workoutTitle,
            });
        })
        .catch((err) => {
            console.warn(err);
        });
  };
  return (
    <NativeBaseProvider>
      <ScrollView backgroundColor={theme.colors.background}>
        <VStack direction="column" mt="100" space={10}>
          <Box alignItems="center">
            <Text style={customStyles.header}>{route.params.title}</Text>
            <FormControl isInvalid w="85%" maxW="350px" mb="5">
              <FormControl.Label>Target Sets</FormControl.Label>
              <Input
                placeholder="enter target set"
                onChangeText={(text) =>
                  SetExercise({
                    ...exercise,
                    targetSets: text,
                  })
                }
              />
              <FormControl.Label>Target Reps</FormControl.Label>
              <Input
                placeholder="Enter Target Reps"
                onChangeText={(text) =>
                  SetExercise({
                    ...exercise,
                    targetReps: text,
                  })
                }
              />
              <FormControl.Label>Target Weight - kg</FormControl.Label>
              <Input
                placeholder="Enter Weight"
                onChangeText={(text) =>
                  SetExercise({
                    ...exercise,
                    targetWeight: text,
                  })
                }
              />
              <FormControl.Label>Estimated Time - mins</FormControl.Label>
              <Input
                placeholder="Enter Estimated Time"
                onChangeText={(text) =>
                  SetExercise({
                    ...exercise,
                    estimatedTime: text,
                  })
                }
              />
              <FormControl.Label>Comment</FormControl.Label>
              <Input
                placeholder="Enter comment"
                onChangeText={(text) =>
                  SetExercise({
                    ...exercise,
                    comment: text,
                  })
                }
              />
            </FormControl>
            <Button
              rounded="full"
              w="170"
              p="2"
              onPress={submitExercise}
              backgroundColor={theme.colors.secondary}
            >
              Set
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CreateExercise;
