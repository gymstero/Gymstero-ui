import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  VStack,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from "native-base";
import { useState, useEffect } from "react";
import exerciseMedia from "../../exerciseContent/exerciseMedia";
import { theme } from "../../theme/theme";
import { getIdToken } from "../auth/auth";
import ItemCard from "../Layout/ItemCard";

const ChooseExercise = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    const idToken = await getIdToken();

    let eTypeQuery, mGroupQuery;
    if (route.params.eType === "Any") {
      eTypeQuery = "";
    } else {
      eTypeQuery = `exerciseType=${route.params.eType}`;
    }

    if (route.params.mGroup === "Any") {
      mGroupQuery = "";
    } else {
      mGroupQuery = `muscleGroup=${route.params.mGroup}`;
    }

    fetch(
      `http://10.0.2.2:8080/api/workout/exercises?${eTypeQuery}&${mGroupQuery}`,
      {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setExercises(res.exercises);
        console.info("Exercises are fetched", res.exercises);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <NativeBaseProvider flex={1}>
      <Text textAlign={"center"} style={theme.typography.h2}>
        {route.params.eType}{" "}
        {route.params.mGroup === "Any" ? "All" : route.params.mGroup} Exercises
      </Text>
      <ScrollView h="80%">
        <VStack alignItems="center" justifyContent="center" space={0} mt={5}>
          {exercises && exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <View
                alignItems={"center"}
                //borderColor={"coolGray.300"}
                borderTopColor={"coolGray.100"}
                borderTopWidth={2}
                borderBottomColor={"coolGray.100"}
                borderBottomWidth={2}
                //borderRadius={10}
                // padding={1}
                marginLeft={5}
                marginRight={5}
              >
                <ItemCard
                  key={index}
                  imageSource={exerciseMedia[exercise.id].picture}
                  title={exercise.title}
                  onPress={() =>
                    navigation.navigate("CreateExercise", {
                      id: exercise.id,
                      title: exercise.title,
                      workoutTitle: route.params.workoutTitle,
                      workoutId: route.params.workoutId,
                    })
                  }
                  imageStyle={{
                    width: 100,
                    height: 100,
                    marginRight: 30,
                    marginLeft: 10,
                    padding: 5,
                  }}
                />
              </View>
            ))
          ) : (
            <Text>Nothing Here Yet</Text>
          )}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ChooseExercise;

/**
 * 
 <Button
                                minW={150}
                                key={index}
                                onPress={() =>
                                    navigation.navigate('CreateExercise', {
                                        id: exercise.id,
                                        title: exercise.title,
                                        workoutTitle: route.params.workoutTitle,
                                        workoutId: route.params.workoutId,
                                    })
                                }>
                                {exercise.title}
                            </Button>
 */
