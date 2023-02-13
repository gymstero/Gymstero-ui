import React, { useEffect, useState } from 'react';
import {
    Container,
    Flex,
    Image,
    Spacer,
    Text,
    HStack,
    NativeBaseProvider,
    VStack,
    ShareIcon,
    ScrollView,
} from 'native-base';
import UserInfo from './UserInfo';
import WorkoutInfo from './WorkoutInfo';
import { getUser, getIdToken } from '../auth/auth';
const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [workoutData, setWorkoutData] = useState({});

    const fetchUserProfile = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/profile`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setUserData(res.userData);
                console.log('USER', userData);
            })
            .catch((err) => {
                console.warn(err);
            });

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/workouts`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setWorkoutData(res.workouts);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);
    return (
        <NativeBaseProvider flex={1}>
            <ScrollView>
                <VStack alignItems='center'>
                    <Container mt={5}>
                        <Flex flexDirection='row'>
                            <Image
                                source={{
                                    uri:
                                        userData.photoURL ||
                                        'https://img.icons8.com/ios-glyphs/90/000000/user--v1.png',
                                }}
                                alt='user profile'
                                size='xl'
                                flex={2}
                            />
                            <Container mx={5} flex={3} my='auto' py={2}>
                                <HStack>
                                    <Text fontSize={20} fontWeight={600}>
                                        {userData.username}
                                    </Text>
                                    <Spacer />
                                    <HStack>
                                        <ShareIcon size='lg' mr={4} />
                                        <Text fontSize={16}>
                                            {userData.numOfFollowers || '10'}
                                        </Text>
                                    </HStack>
                                </HStack>

                                <Text py={2}>{userData.description}</Text>
                            </Container>
                        </Flex>
                    </Container>
                    <Container my={5} width='100%'>
                        <WorkoutInfo workouts={workoutData} />
                    </Container>
                    <Container my={5}>
                        <UserInfo />
                    </Container>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default UserProfile;
