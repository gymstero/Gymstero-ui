import React, { useEffect, useState } from "react";
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
import { getUser, getIdToken } from '../auth/auth';
import { customStyles } from '../../theme/customStyles';
import { REACT_APP_API_URL } from '../../../config';

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followers, setFollowers] = useState([]);

    const fetchUserProfile = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/profile`, {
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
                console.log('User data fetched', userData);
            })
            .catch((err) => {
                console.warn(err);
            });

        fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/get-connections`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setFollowingUsers(res.followingUsers);
                setFollowers(res.followers);
                console.log(
                    'Connected user data fetched',
                    followingUsers,
                    followers
                );
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
                <VStack style={customStyles.container}>
                    <Container mt={8}>
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

                    <Container my={5}>
                        <UserInfo
                            title='Following Users'
                            users={followingUsers}
                        />
                    </Container>
                    <Container my={5}>
                        <UserInfo title='Followers' users={followers} />
                    </Container>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default UserProfile;
