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
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getIdToken } from '../auth/auth';

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

    const updateWorkout = async () => {
        const idToken = await getIdToken();

        let exerciseGoalIds = [];
        exerciseGoals.forEach((exerciseGoal) =>
            exerciseGoalIds.unshift(exerciseGoal.id)
        );

        fetch(`http://10.0.2.2:8080/api/workout/${id}`, {
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
                    newIndex: index + (direction === 'UP' ? -1 : 1),
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
            <VStack alignItems='center' mt='45'>
                <Center width='100%' bg={'black'}>
                    <Heading color={'white'}>{title}</Heading>
                </Center>
                {exerciseGoals && exerciseGoals.length > 0 ? (
                    <FlatList
                        maxH='70%'
                        data={exerciseGoals}
                        keyExtractor={(exerciseGoal) => exerciseGoal.id}
                        refreshing={refreshing}
                        onRefresh={fetchWorkout}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('ModifyExercise', {
                                        exerciseGoal: item,
                                        workoutId: id,
                                        workoutTitle: title,
                                    })
                                }>
                                <Box
                                    minW={350}
                                    borderWidth='2'
                                    borderColor='coolGray.200'
                                    p='2'
                                    my='2'
                                    alignSelf='center'>
                                    <HStack>
                                        <VStack>
                                            <Text
                                                fontSize='lg'
                                                fontWeight='600'>
                                                {item.exerciseInfo.title}
                                            </Text>
                                            <Text>
                                                {item.exerciseInfo.exerciseType}{' '}
                                                -{' '}
                                                {item.exerciseInfo.muscleGroup}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack alignSelf='center'>
                                            <ChevronUpIcon
                                                onPress={() =>
                                                    changeOrder(index, 'UP')
                                                }
                                            />
                                            <ChevronDownIcon
                                                onPress={() =>
                                                    changeOrder(index, 'DOWN')
                                                }
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
                
                <Box w='85%'>
                {exerciseGoals && exerciseGoals.length > 0 ? (
                    <Button
                        rounded='full'
                        w='100%'
                        p='2'
                        mb={2}
                        variant='outline'
                        title='Run'
                        onPress={() =>
                            navigation.navigate('RunExercise', {
                                exercises: exerciseGoals,
                            })
                        }>
                        Run Workout
                    </Button>
                     ) : (
                        <></>
                    )}
                    <Button
                        rounded='full'
                        w='100%'
                        p='2'
                        mb={3}
                        variant='outline'
                        title='Profile'
                        onPress={() =>
                            navigation.navigate('ChooseExerciseType', {
                                workoutId: route.params.id,
                                title: route.params.title,
                            })
                        }>
                        Add new Exercise
                    </Button>
                    
                    {exerciseGoals && exerciseGoals.length > 0 ? (
                        <Button
                            rounded='full'
                            w='100%'
                            p='2'
                            variant='outline'
                            title='Profile'
                            onPress={updateWorkout}>
                            Update Workout Plan
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
    container: {
        padding: 20,
        alignItems: 'center',
        flex: 1,
    },
    createWorkoutButton: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        height: 100,
    },
    createWorkoutImage: {
        width: '100%',
        flex: 1,
        resizeMode: 'cover',
        overlayColor: 'black',
    },
    addWorkoutButton: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        height: 100,
        flex: 1,
    },
    addWorkoutImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        flex: 1,
    },
    buttonText: {
        backgroundColor: '#2E2E2E',
        color: '#FFF0EE',
        fontWeight: '',
        textAlign: 'center',
        marginTop: 10,
        position: 'absolute',
        top: '30%',
        left: '16%',
        fontSize: 20,
    },
    recentlyOpenedWorkoutsContainer: {
        marginTop: 0,
        padding: 20,
        backgroundColor: 'lightgrey',
    },
    recentlyOpenedWorkoutsTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    recentlyOpenedWorkoutsList: {
        /* Add styles for the list of recently opened workouts */
    },
};

export default ViewWorkoutPlan;
