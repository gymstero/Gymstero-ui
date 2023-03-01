import { ScrollView } from 'react-native';
import { NativeBaseProvider, Button, Input, Box, Heading } from 'native-base';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getUser, getIdToken } from '../auth/auth';

import { theme } from '../../theme/theme';

const CreateWorkoutPlan = () => {
    const [plan, setPlan] = useState({
        id: '',
        title: '',
    });
    const navigation = useNavigation();

    const submitWorkoutPlan = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/workout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
                title: plan.title,
                exerciseGoals: [],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.info('Workout fetched', res);
                navigation.navigate('ViewWorkoutPlan', {
                    id: res.id,
                    title: plan.title,
                });
            })
            .catch((err) => {
                console.warn(err);
            });
    };
    return (
        <NativeBaseProvider>
            <ScrollView>
                <Box bg='black' w='100%' alignItems='center'>
                    <Heading color='white' w='85%' p='2'>
                        New Workout Plan
                    </Heading>
                </Box>
                <Box w='100%' alignItems='center'>
                    <Input
                        variant='rounded'
                        p='2'
                        mt='2'
                        placeholder='Enter Workout Title'
                        onChangeText={(text) =>
                            setPlan({
                                ...plan,
                                title: text,
                            })
                        }
                    />
                    <Button
                        backgroundColor={theme.colors.secondary}
                        w='50%'
                        mt='2'
                        rounded='full'
                        onPress={submitWorkoutPlan}>
                        Submit
                    </Button>
                </Box>
            </ScrollView>
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

export default CreateWorkoutPlan;
