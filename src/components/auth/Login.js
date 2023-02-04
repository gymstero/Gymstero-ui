import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Box, 
  NativeBaseProvider,
  VStack, 
  Button, 
  FormControl, 
  Input, 
  WarningOutlineIcon,
  Text} from 'native-base';
import {
    GoogleSigninButton,
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const loginWithEmail = async (email, password) => {
        setError(false);
        setUserMessage('');
        setEmailMessage('');
        setPasswordMessage('');
        let isValid = true;

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailMessage('Invalid email. Please use valid email.');
            isValid = false;
        }

        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                password
            )
        ) {
            setPasswordMessage(
                'Password must be minimum 8 characters with at least one uppercase letter, one lowercase letter, one, number, and one special character'
            );
            isValid = false;
        }

        if (!isValid) {
            setUserMessage('Invalid form request. Please try again.');
            setError(true);
            return;
        }

        const userData = {
            email: email,
            password: password,
        };

        fetch('http://10.0.2.2:8080/user/login', {
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
                    navigation.navigate('Home');
                }
            })
            .catch((err) => {
                console.error('Error in login', err);
                setUserMessage('Something went wrong in login');
                setError(true);
            });
    };

    GoogleSignin.configure({
        webClientId:
            '993292350774-qhu55smntth2s3qqsp9k4mntm5lkqhlg.apps.googleusercontent.com',
    });

    const signInWithGoogle = async () => {
        setError(false);
        setUserMessage('');

        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            const userInfo = await auth().signInWithCredential(
                googleCredential
            );

            if (userInfo) {
                navigation.navigate('Home');
            } else {
                setError(true);
                setUserMessage('Could not get user info');
            }
        } catch (err) {
            console.error('Error in Google sign-in', err);
            setError(true);
        }
    };

    return (
        <NativeBaseProvider>
            <VStack direction='column' mt='100' space={10}>
                <Box alignItems='center'>
                    <FormControl isInvalid w='85%' maxW='350px' mb='5'>
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
                    </FormControl>
                    <Box w='85%'>
                        {error ? (
                            <Text fontSize='md' color='red.600'>
                                {userMessage}
                            </Text>
                        ) : (
                            <Text fontSize='md' color='black'>
                                {userMessage}
                            </Text>
                        )}
                    </Box>
                    <Box w='85%' mt='5'>
                        <Button
                            rounded='full'
                            w='100%'
                            p='4'
                            onPress={() => loginWithEmail(email, password)}>
                            Login
                        </Button>
                    </Box>
                    <Box w='87%' mt='15'>
                        <GoogleSigninButton
                            rounded='full'
                            style={{ width: '100%', height: 60 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={signInWithGoogle}
                        />
                    </Box>
                </Box>
            </VStack>
        </NativeBaseProvider>
    );
};

export default Login;