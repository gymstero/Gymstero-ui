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
} from '@react-native-google-signin/google-signin';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const loginWithEmail = async (email, password) => {
      setUserMessage('');
      setEmailMessage('');
      setPasswordMessage('');
      setError(false);

      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setEmailMessage('Invalid email. Please use valid email.');
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


      if (error) {
          setUserMessage('Invalid form request. Please try again.');
          return;
      }

      const userData = {
          email: email,
          password: password,
      };

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
                            rounded= "full" 
                            w='100%'
                            p='4'
                            onPress={() =>{}
                                }>
                            Login
                        </Button>
                    </Box>
                    <Box w='87%' mt='15'>
                        <GoogleSigninButton rounded= "full"
                            style={{ width: '100%', height: 60 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => {}}
                        />
                    </Box>
                </Box>
            </VStack>
        </NativeBaseProvider>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
});
*/
export default Login;