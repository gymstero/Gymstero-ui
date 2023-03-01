
import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getUser, getIdToken } from '../auth/auth';
const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef(null);
    const navigation = useNavigation();

    const onClose = () => setIsOpen(!isOpen);

    const fetchWorkouts = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/workouts`, {
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
            .finally(() => setRefreshing(false));
    };

    useEffect(() => {
        fetchWorkouts();
    }, [refreshing]);

    const deleteWorkout = async (workoutId) => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(
            `http://10.0.2.2:8080/api/user/${userInfo.uid}/workout/${workoutId}`,
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
                    onPress={() => navigation.navigate('AddWorkoutPlan')}
                    mt='2'>
                    <Text style={styles.addButtonText}>ADD WORKOUT PLAN</Text>
                </Pressable>
                {workouts && workouts.length > 0 ? (
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
                                }>
                                <HStack mt={2}>
                                    <MaterialCommunityIcons
                                        name='circle'
                                        color='gray.100'
                                        size={40}
                                    />
                                    <Container w='80%' ml={2} my='auto'>
                                        <Text fontSize={18}>{item.title}</Text>
                                    </Container>
                                    <Pressable my='auto'>
                                        <DeleteIcon
                                            size='4'
                                            onPress={() => setIsOpen(!isOpen)}
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
                                                This will remove all data
                                                relating to Workout Plan. Are
                                                you sure?
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
                                                        colorScheme='danger'
                                                        onPress={() => {
                                                            deleteWorkout(
                                                                item.id
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
                            </Pressable>
                        )}
                    />
                ) : (
                    <Text style={styles.title}>Nothing Here Yet</Text>
                )}
            </View>
        </NativeBaseProvider>
    );
};

const styles = {
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '',
        marginBottom: 20,
    },
    workout: {
        fontSize: 16,
        marginBottom: 10,
    },
    addButton: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#050D13',
        width: '100%',
        height: 60,
        borderRadius: 2,
        padding: 20,
    },
    addButton: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#050D13',
        width: '100%',
        height: 60,
        borderRadius: 2,
        padding: 20,
    },
    addButtonText: {
        alignItems: 'center',
        color: '#FFF0EE',
        fontWeight: '',
    },
};

export default WorkoutPage;
