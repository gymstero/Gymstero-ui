import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Button,
    VStack,
    NativeBaseProvider,
    ScrollView,
    Text
} from 'native-base';
import { useState, useEffect } from 'react';
import { getUser, getIdToken } from '../auth/auth';

const ChooseExercise= () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [exercises, setExercises] = useState([]);
    const fetchExercises = async () => {
        const idToken = await getIdToken();
        let query = '?';
        if (route.params.eType != 'skip') {
            query += `exerciseType=${route.params.eType}&`;
        }
        if (route.params.mGroup != 'skip') {
            query += `muscleGroup=${route.params.mGroup}`;
        }
        fetch(
            `http://10.0.2.2:8080/api/workout/exercises?exerciseType=${route.params.eType}&muscleGroup=${route.params.mGroup}`,
            {
                method: 'Get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => {
                setExercises(res.exercises);
                console.log(res.exercises);
                console.log('RES2', res);
            })
            .catch((err) => {
                console.warn(err);
            });
    };
    
       useEffect(() => {
        fetchExercises();
        }, []);

    return (
        <NativeBaseProvider flex={1} bg='red'>
            <ScrollView h='80%'>
                <VStack
                    alignItems='center'
                    justifyContent='center'
                    space={4}
                    mt={5}>
                    <Text fontSize={20} fontWeight={600}>
                        {route.params.eType}, {route.params.mGroup}
                    </Text>
                    {exercises.length > 0 ? (
                        exercises.map((exercise, index) => (
                            <Button
                                minW={150}
                                key={index}
                                onPress={() =>
                                    navigation.navigate('CreateExercise', {
                                        id: exercise.id,
                                        title: exercise.title,
                                        workoutId: route.params.workoutId,
                                    })
                                }>
                                {exercise.title}
                            </Button>
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