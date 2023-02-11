import { useNavigation } from '@react-navigation/native';
import {
    NativeBaseProvider,
    VStack,
    Box,
    Button,
    Image,
    Pressable,
    Text,
    ScrollView,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { getUser, getIdToken } from '../auth/auth';
import image1 from '../../images/schedule.png';
import image2 from '../../images/workout.png';

const Dashboard = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const fetchUser = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/setting`, {
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
                console.info('User data fetched', userData);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <NativeBaseProvider flex={1}>
            <VStack alignItems='center' mt='50'>
                <Box>
                    <Text>Welcome, {userData.username}</Text>
                </Box>
                <Box w='85%' mt='5'>
                    <Button
                        rounded='full'
                        w='100%'
                        p='2'
                        variant='outline'
                        title='Profile'
                        onPress={() => navigation.navigate('UserProfile')}>
                        Profile
                    </Button>
                </Box>
                <Box width='85%' p='12' bg='gray.300' mt='4'>
                    <ScrollView w={['200', '300']} h='50'></ScrollView>
                </Box>
                <Box w='85%' mt='4'>
                    <Pressable
                        w='100%'
                        onPress={() => navigation.navigate('Schedule')}>
                        <Image
                            source={image1}
                            alt='Schedule Shortcut'
                            size={70}
                            width='100%'
                        />
                    </Pressable>
                </Box>
                <Box w='85%' mt='4'>
                    <Pressable
                        w='100%'
                        onPress={() => navigation.navigate('Workout')}>
                        <Image
                            source={image2}
                            alt='Create Workout short Cut'
                            size={70}
                            width='100%'
                        />
                    </Pressable>
                </Box>
            </VStack>
        </NativeBaseProvider>
    );
};

export default Dashboard;
