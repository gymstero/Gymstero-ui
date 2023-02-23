import {  ScrollView } from "react-native";
import {
    NativeBaseProvider,
    Button,
    Input,
    Box,
    Heading,
    VStack,
    Center,
    Text,
    FlatList,
    HStack,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUser, getIdToken } from '../auth/auth';

const ViewWorkoutPlan = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefreshing] = useState(false);
    const [exerciseGoals, setExerciseGoals] = useState([]);
    const { title, id } = route.params;

    const fetchWorkout = async () => {
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/workout/${id}/exercise-goals`, {
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
            .finally(() => setRefreshing(false));
    };

    useEffect(() => {
        fetchWorkout();
    }, [route, refreshing]);

    return (
        <NativeBaseProvider flex={1}>
            <VStack alignItems='center' mt='50'>
                <Center width='100%' bg={'black'}>
                    <Heading color={'white'}>{title}</Heading>
                </Center>
                {exerciseGoals && exerciseGoals.length > 0 ? (
                    <FlatList
                        maxH='85%'
                        data={exerciseGoals}
                        keyExtractor={(exerciseGoal) => exerciseGoal.id}
                        refreshing={refreshing}
                        onRefresh={fetchWorkout}
                        renderItem={({ item }) => (
                            <Box
                                minW={350}
                                borderWidth='2'
                                borderColor='coolGray.200'
                                p='2'
                                my='2'
                                alignSelf='center'>
                                <Text fontSize='lg' fontWeight='600'>
                                    {item.exerciseInfo.title}
                                </Text>
                                <Text>
                                    {item.exerciseInfo.exerciseType} -
                                    {item.exerciseInfo.muscleGroup}
                                </Text>
                            </Box>
                        )}
                    />
                ) : (
                    <Text style={styles.title}>Nothing Here Yet</Text>
                )}
                <Box w='85%' mt='5'>
                    <Button
                        rounded='full'
                        w='100%'
                        p='2'
                        variant='outline'
                        title='Profile'
                        onPress={() =>
                            navigation.navigate('ChooseExerciseType', {
                                workoutId: route.params.id,
                            })
                        }>
                        Add new Exercise
                    </Button>
                </Box>
            </VStack>
        </NativeBaseProvider>
    );
};

const styles = {
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  createWorkoutButton: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
  },
  createWorkoutImage: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    overlayColor: "black",
  },
  addWorkoutButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
    flex: 1,
  },
  addWorkoutImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    flex: 1,
  },
  buttonText: {
    backgroundColor: "#2E2E2E",
    color: "#FFF0EE",
    fontWeight: "",
    textAlign: "center",
    marginTop: 10,
    position: "absolute",
    top: "30%",
    left: "16%",
    fontSize: 20,
  },
  recentlyOpenedWorkoutsContainer: {
    marginTop: 0,
    padding: 20,
    backgroundColor: "lightgrey",
  },
  recentlyOpenedWorkoutsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  recentlyOpenedWorkoutsList: {
    /* Add styles for the list of recently opened workouts */
  },
};

export default ViewWorkoutPlan;
