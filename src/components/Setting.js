import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    HStack,
    Image,
    NativeBaseProvider,
    Switch,
    Stack,
    VStack,
    Text,
    Input,
    TextArea,
    Spacer,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { getUser } from './auth/auth';

const Setting = () => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [description, setDescription] = useState('');
    const [publicUser, setPublicUser] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(async () => {
        const user = await getUser();
        console.log('USER', user.user);
        fetch(`http://10.0.2.2:8080/api/user/{id}/setting`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    });

    return (
        <NativeBaseProvider style={styles.container}>
            <TouchableOpacity>
                <Stack>
                    <VStack alignItems='center' space={50}>
                        <Flex height={150} flexDirection='row'>
                            <Image
                                source={{
                                    uri: 'https://img.icons8.com/ios-glyphs/90/000000/user--v1.png',
                                }}
                                alt='user profile'
                                size='xl'
                                flex={1}
                            />
                            <Container mx={5} flex={2} my='auto'>
                                <Text fontSize={16} fontWeight={600} mb={1}>
                                    Username
                                </Text>
                                <Input
                                    alignSelf='center'
                                    value={'test'}
                                    isDisabled={editMode}
                                />
                            </Container>
                        </Flex>
                        <Container>
                            <Container>
                                <Text fontSize={16} fontWeight={600} mb={1}>
                                    User Description
                                </Text>
                                <TextArea
                                    h={20}
                                    width='100%'
                                    value={'Hello, there'}
                                />
                            </Container>
                            <Container my={10}>
                                <Flex flexDirection='row' alignItems='center'>
                                    <Text fontSize={16} fontWeight={600} mb={1}>
                                        Public User
                                    </Text>
                                    <Spacer />
                                    <Switch size='lg' />
                                </Flex>
                            </Container>

                            <Button>Edit User Info</Button>
                        </Container>
                    </VStack>
                </Stack>
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
