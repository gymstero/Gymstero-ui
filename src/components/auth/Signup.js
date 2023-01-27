import React, { useState } from 'react';
import {
    Button,
    Text,
    Flex,
    Container,
    Stack,
    Input,
    FormControl,
    WarningOutlineIcon,
    Box,
    Center,
    NativeBaseProvider,
} from 'native-base';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const signupWithEmail = async (email, password, confirmPassword) => {
        setError(false);
        setUserMessage('');
        setEmailMessage('');
        setPasswordMessage('');
        setConfirmPasswordMessage('');

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailMessage('Invalid email. Please enter valid email.');
            setError(true);
        }

        if (
            !password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            )
        ) {
            setPasswordMessage(
                'Password must be minimum 8 characters with at least one uppercase letter, one lowercase letter, one, number, and one special character'
            );
            setError(true);
        }

        console.log('PASSWORD MATCH: ', password === confirmPassword);
        if (password !== confirmPassword) {
            setConfirmPasswordMessage('Passwords do not match');
            setError(true);
        }

        if (error) {
            console.log('ERROR IN THE FORM');
            setUserMessage('Invalid form request. Please try again.');
            return;
        }

        const userData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };

        fetch('http://10.0.2.2:8080/user/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.code > 201) {
                    setUserMessage(res.message);
                    setError(true);
                } else {
                    setUserMessage(res.message);
                }
            })
            .catch((err) => {
                console.log('Error in signup', err);
                setUserMessage(
                    'Something went wrong while creating user account'
                );
                setError(true);
            });
    };

    return (
        <NativeBaseProvider>
            <Stack direction='column' mt='100' space={10}>
                <Box alignItems='center'>
                    <FormControl isInvalid w='85%' maxW='350px' mb='10'>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            placeholder='Enter email'
                            type='email'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size='xs' />}>
                            {emailMessage}
                        </FormControl.ErrorMessage>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            placeholder='Enter password'
                            type='password'
                            value={password}
                            onChangeText={setPassword}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size='xs' />}>
                            {passwordMessage}
                        </FormControl.ErrorMessage>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input
                            placeholder='Confirm password'
                            type='password'
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size='xs' />}>
                            {confirmPasswordMessage}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Box w='85%' mt='15'>
                        <Button
                            w='100%'
                            p='4'
                            onPress={() =>
                                signupWithEmail(
                                    email,
                                    password,
                                    confirmPassword
                                )
                            }>
                            Sign Up
                        </Button>
                        <Text>{userMessage}</Text>
                    </Box>
                </Box>
            </Stack>
        </NativeBaseProvider>
    );
};

export default Signup;