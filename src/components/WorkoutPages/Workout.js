import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    NativeBaseProvider,
    Pressable,
    HStack,
    Container,
    AlertDialog,
    DeleteIcon,
    Text,
    FlatList,
    Button,
    Divider,
} from 'native-base';
import { getUser, getIdToken } from "../auth/auth";
import { theme } from "../../theme/theme";
import WorkoutPlanCard from "../Layout/WorkoutPlanCard";
import { customStyles } from "../../theme/customStyles";
import { REACT_APP_API_URL } from '../../../config';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [workoutToDelete, setWorkoutToDelete] = useState({});
    const cancelRef = useRef(null);
    const navigation = useNavigation();
    const onClose = () => setIsOpen(!isOpen);
    const [loading, setLoading] = useState(false);

    const fetchWorkouts = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();
        setLoading(true);

        fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/workouts`, {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setWorkouts(res.workouts);
                setRefreshing(false);
                console.info('Workout fetched', res.workouts, workouts);
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchWorkouts();
    }, [refreshing]);

    const deleteWorkout = async (workoutId) => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(
            `${REACT_APP_API_URL}/api/user/${userInfo.uid}/workout/${workoutId}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => {
                console.info('Workout deleted', res);
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => setRefreshing(false));
    };

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Pressable
                    activeOpacity={0.7}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddWorkoutPlan')}>
                    <Text style={styles.addButtonText}>ADD WORKOUT PLAN</Text>
                </Pressable>
                {loading ? (
                    <View style={customStyles.loadingContainer}>
                        <ActivityIndicator
                            size='large'
                            color={theme.colors.secondary}
                        />
                    </View>
                ) : workouts && workouts.length > 0 ? (
                    <FlatList
                        data={workouts}
                        keyExtractor={(item) => item.id}
                        refreshing={refreshing}
                        onRefresh={fetchWorkouts}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('ViewWorkoutPlan', {
                                        id: item.id,
                                        title: item.title,
                                    })
                                }
                                padding={5}
                                mb={2}>
                                <HStack mt={2}>
                                    <Container w='90%' ml={4} my='auto'>
                                        <Text fontSize={20} fontWeight={'bold'}>
                                            {item.title}
                                        </Text>
                                    </Container>
                                    <Pressable my='auto'>
                                        <DeleteIcon
                                            ml={5}
                                            size='4'
                                            color={theme.colors.secondary}
                                            onPress={() => {
                                                setWorkoutToDelete({
                                                    id: item.id,
                                                    title: item.title,
                                                });
                                                setIsOpen(!isOpen);
                                            }}
                                        />
                                    </Pressable>

                                    <AlertDialog
                                        leastDestructiveRef={cancelRef}
                                        isOpen={isOpen}
                                        onClose={onClose}>
                                        <AlertDialog.Content>
                                            <AlertDialog.CloseButton />
                                            <AlertDialog.Header>
                                                Delete Workout Plan
                                            </AlertDialog.Header>
                                            <AlertDialog.Body>
                                                {`This will remove all data relating to ${workoutToDelete.title}. Are you sure?`}
                                            </AlertDialog.Body>
                                            <AlertDialog.Footer>
                                                <Button.Group space={2}>
                                                    <Button
                                                        variant='unstyled'
                                                        colorScheme='coolGray'
                                                        onPress={onClose}
                                                        ref={cancelRef}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        colorScheme='red'
                                                        onPress={() => {
                                                            deleteWorkout(
                                                                workoutToDelete.id
                                                            );
                                                            setRefreshing(true);
                                                            onClose();
                                                        }}>
                                                        Delete
                                                    </Button>
                                                </Button.Group>
                                            </AlertDialog.Footer>
                                        </AlertDialog.Content>
                                    </AlertDialog>
                                </HStack>
                                <Divider m={1} />
                                <WorkoutPlanCard
                                    imageSources={item.exercises}
                                />
                            </Pressable>
                        )}
                    />
                ) : (
                    <View style={customStyles.loadingContainer}>
                        <Text>Nothing Here Yet</Text>
                        <Text>
                            You can Add Workout Plans using button above
                        </Text>
                    </View>
                )}
            </View>
        </NativeBaseProvider>
    );
};

const styles = {
  container: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "",
    marginBottom: 20,
  },
  workout: {
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#050D13",
    // marginLeft: 25,
    //  marginRight: 25,
    height: 60,
    borderRadius: 2,
    padding: 20,
    width: "90%",
  },
  addButtonText: {
    alignItems: "center",
    color: "#FFF0EE",
    fontWeight: "",
  },
};

export default WorkoutPage;
