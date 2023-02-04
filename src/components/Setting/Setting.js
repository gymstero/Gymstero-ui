import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    NativeBaseProvider,
    Switch,
    VStack,
    Text,
    Input,
    TextArea,
    Spacer,
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getUser, getIdToken } from '../auth/auth';

const Setting = () => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({});
    const [userMessage, setUserMessage] = useState('');
    const [error, setError] = useState(false);

    const updateButtonPressed = () => {
        setEditMode(true);
    };

    const saveButtonPressed = async () => {
        const userInfo = await getUser();
        const idToken = await getIdToken();
        console.log('USER', userData);

        fetch(`http://10.0.2.2:8080/api/user/${userInfo.uid}/setting`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((res) => console.log('USER DATA SAVED', res))
            .catch((err) => {
                console.error(err);
            });

        setEditMode(false);
    };

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
                console.log('RES', userData);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    const googleLogout = async () => {
        setError(false);
        setUserMessage('');

        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.navigate('Authentication');
        } catch (err) {
            console.error('Error in Google logout', err);
            setUserMessage('Something went wrong. Please try again.');
            setError(true);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <NativeBaseProvider style={styles.container}>
            <TouchableOpacity>
                <VStack alignItems='center'>
                    {editMode ? (
                        <>
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
                                    <Container mx={5} flex={3} my='auto'>
                                        <Text
                                            fontSize={16}
                                            fontWeight={600}
                                            mb={1}>
                                            Username
                                        </Text>
                                        <Input
                                            alignSelf='center'
                                            value={userData.username}
                                            onChangeText={(text) =>
                                                setUserData({
                                                    ...userData,
                                                    username: text,
                                                })
                                            }
                                        />
                                    </Container>
                                </Flex>
                            </Container>
                            <Container mt={5}>
                                <Text fontSize={16} fontWeight={600} mb={1}>
                                    User Description
                                </Text>
                                <Box width='100%' height={100} shadow={2}>
                                    <TextArea
                                        h={20}
                                        width='100%'
                                        value={userData.description}
                                        onChangeText={(text) =>
                                            setUserData({
                                                ...userData,
                                                description: text,
                                            })
                                        }
                                    />
                                </Box>
                            </Container>
                            <Container my={5}>
                                <Flex flexDirection='row' alignItems='center'>
                                    <Text fontSize={16} fontWeight={600} mb={1}>
                                        Public User
                                    </Text>
                                    <Spacer />
                                    <Switch
                                        size='lg'
                                        value={userData.publicUser}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                publicUser:
                                                    !userData.publicUser,
                                            })
                                        }
                                    />
                                </Flex>
                            </Container>
                            <Container my={5}>
                                <Text fontSize={16} fontWeight={600} mb={1}>
                                    Password
                                </Text>
                                <Input
                                    type='password'
                                    alignSelf='center'
                                    value={userData.password}
                                    onChangeText={(text) =>
                                        setUserData({
                                            ...userData,
                                            password: text,
                                        })
                                    }
                                />
                            </Container>
                            <Container mt={5} mx='auto'>
                                <Button width={200} onPress={saveButtonPressed}>
                                    Save
                                </Button>
                            </Container>
                        </>
                    ) : (
                        <>
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
                                    <Container mx={5} flex={3} my='auto'>
                                        <Text
                                            fontSize={16}
                                            fontWeight={600}
                                            mb={1}>
                                            Username
                                        </Text>
                                        <Text>{userData.username}</Text>
                                    </Container>
                                </Flex>
                                <Container my={5}>
                                    <Text fontSize={16} fontWeight={600} mb={1}>
                                        User Description
                                    </Text>
                                    <Box width='100%' height={100} shadow={2}>
                                        <Text>{userData.description}</Text>
                                    </Box>
                                </Container>
                                <Container my={5}>
                                    <Flex
                                        flexDirection='row'
                                        alignItems='center'>
                                        <Text
                                            fontSize={16}
                                            fontWeight={600}
                                            mb={5}>
                                            Public User
                                        </Text>
                                        <Spacer />
                                        <Switch
                                            size='lg'
                                            value={userData.publicUser}
                                            disabled
                                        />
                                    </Flex>
                                </Container>
                                <Container mt={10} mx='auto'>
                                    <Box w='85%'>
                                        <Button
                                            rounded='full'
                                            width={230}
                                            p='2'
                                            mb={5}
                                            onPress={updateButtonPressed}>
                                            Update
                                        </Button>
                                        <Button
                                            rounded='full'
                                            width={230}
                                            p='2'
                                            onPress={googleLogout}>
                                            Log Out
                                        </Button>
                                        {error ? (
                                            <Text fontSize='md' color='red.600'>
                                                {userMessage}
                                            </Text>
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                </Container>
                            </Container>
                        </>
                    )}
                </VStack>
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

export default Setting;
