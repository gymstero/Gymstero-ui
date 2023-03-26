import React, {useState, useEffect} from 'react';
import {
    NativeBaseProvider,
    Center,
    Text,
    Button,
    Input,
    Pressable,
    FlatList,
    HStack,
    Container,
    Image,
} from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { getIdToken, getUser } from './auth/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

const Social = () => {
    const [workouts, setWorkouts] = useState([]);
    const [users, setUsers] = useState([]);
    const [display, setDisplay] = useState('users');
    const [refreshing, setRefreshing] = useState(true);
    const [input, setInput] = useState('');
    const [following, setFollowing] = useState([]);

    const isFocused = useIsFocused();

    const changeDisplay = (type) => {
        if (type != display) {
            setDisplay(type);
        }
    };

    const fetchWorkouts = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/workout/user/${userInfo.uid}`, {
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
                console.info('Workout fetched ');
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    const searchWorkout = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(
            `http://10.0.2.2:8080/api/workout/user/${userInfo.uid}?workoutTitle=${input}`,
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
                setWorkouts(res.workouts);
                setRefreshing(false);
                console.info('Workout fetched ');
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                setInput('');
            });
    };

    const fetchUsers = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}`, {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // setFollowing(res.following);
                setUsers(res.users);
                setRefreshing(false);
                console.info('Users fetched', following, users);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    const searchUser = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();

        fetch(
            `http://10.0.2.2:8080/api/user/${userInfo.uid}?username=${input}`,
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
                // setFollowing(res.following);
                setUsers(res.users);
                setRefreshing(false);
                console.info('Users fetched', res.following);
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => {
                setInput('');
            });
    };

    const followAction = async (following, otherUserId) => {
        setRefreshing(true);
        const userInfo = await getUser();
        const idToken = await getIdToken();

        if (!following.includes(otherUserId)) {
            fetch(
                `http://10.0.2.2:8080/api/user/${userInfo.uid}/following/${otherUserId}`,
                {
                    method: 'Put',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    setFollowing(res.following);
                    console.info(`Start following ${otherUserId}`);
                })
                .catch((err) => {
                    console.warn(err);
                });
        } else {
            fetch(
                `http://10.0.2.2:8080/api/user/${userInfo.uid}/unfollowing/${otherUserId}`,
                {
                    method: 'Put',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    setFollowing(res.following);
                    console.info(`Unfollowed ${otherUserId}`);
                })
                .catch((err) => {
                    console.warn(err);
                });
        }
        setRefreshing(false);
    };

    const submitInput = () => {
        if (display == 'users') {
            searchUser();
        } else if (display == 'workouts') {
            searchWorkout();
        }
    };

    const resetSearch = () => {
        setInput('');
        if (display == 'users') {
            fetchUsers();
        } else if (display == 'workouts') {
            fetchWorkouts();
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchWorkouts();
            fetchUsers();
        }
    }, [refreshing, isFocused, following]);

    return (
        <NativeBaseProvider style={styles.container}>
            <TouchableOpacity>
                <Center w='90%' mx='auto'>
                    <HStack mt={10}>
                        <Button
                            w='50%'
                            bg={theme.colors.primary}
                            opacity={display === 'users' ? 1 : 0.75}
                            onPress={() => changeDisplay('users')}>
                            Users
                        </Button>
                        <Button
                            w='50%'
                            bg={theme.colors.primary}
                            opacity={display === 'workouts' ? 1 : 0.75}
                            onPress={() => changeDisplay('workouts')}>
                            Workouts
                        </Button>
                    </HStack>
                    <HStack w='100%'>
                        <Input
                            mt={5}
                            flex={8}
                            onChangeText={(text) => {
                                setInput(text);
                                console.log(text);
                            }}
                            placeholder='Enter User or Workout name...'
                            value={input}
                        />
                        <Button
                            mt={5}
                            flex={1}
                            bg={theme.colors.primary}
                            onPress={() => submitInput()}>
                            <MaterialCommunityIcons
                                name='magnify'
                                color='white'
                                size={32}
                            />
                        </Button>
                    </HStack>

                    {workouts &&
                    display == 'workouts' &&
                    workouts.length > 0 ? (
                        <FlatList
                            data={workouts}
                            keyExtractor={(item) => item.id}
                            refreshing={refreshing}
                            onRefresh={fetchWorkouts}
                            renderItem={({ item }) => (
                                <Pressable>
                                    <HStack mt={2}>
                                        <MaterialCommunityIcons
                                            name='plus'
                                            color='gray.100'
                                            size={40}
                                        />
                                        <Container w='60%' ml={2} my='auto'>
                                            <Text fontSize={18}>
                                                {item.title}
                                            </Text>
                                        </Container>
                                        <Container ml='auto' mr={1}>
                                            <Text my='auto'>
                                                {item.username}
                                            </Text>
                                        </Container>
                                    </HStack>
                                </Pressable>
                            )}
                        />
                    ) : (
                        <></>
                    )}
                    {users && display == 'users' && users.length > 0 ? (
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id}
                            refreshing={refreshing}
                            onRefresh={fetchUsers}
                            renderItem={({ item }) => (
                                <Pressable>
                                    <HStack mt={2}>
                                        <Image
                                            source={{ uri: item.photoURL }}
                                            alt={item.username}
                                            size='sm'
                                        />

                                        <Container w='45%' ml={4} my='auto'>
                                            <Text fontSize={20}>
                                                {item.username}
                                            </Text>
                                        </Container>
                                        <HStack alignSelf='center'>
                                            <Button
                                                bg={theme.colors.primary}
                                                fontSize={14}
                                                w={20}
                                                p={1}
                                                textAlign='right'
                                                alignSelf='center'
                                                onPress={() =>
                                                    followAction(
                                                        following,
                                                        item.id
                                                    )
                                                }>
                                                {following &&
                                                // following.length > 0 &&
                                                following.includes(item.id)
                                                    ? 'Following'
                                                    : 'Follow'}
                                            </Button>
                                            <Text
                                                fontSize={14}
                                                w={5}
                                                ml={2}
                                                textAlign='right'
                                                alignSelf='center'>
                                                {item.numOfFollowers}
                                            </Text>
                                        </HStack>
                                    </HStack>
                                </Pressable>
                            )}
                        />
                    ) : (
                        <></>
                    )}
                </Center>
            </TouchableOpacity>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Social;
