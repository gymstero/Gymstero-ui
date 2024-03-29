import React, { useState } from "react";
import { theme } from "../../theme/theme";
import {
  Button,
  Text,
  Stack,
  Input,
  FormControl,
  WarningOutlineIcon,
  Box,
  NativeBaseProvider,
  View,
  Image,
} from "native-base";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../images/gymsteroLogo.png";
import { REACT_APP_API_URL } from '../../../config';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const navigation = useNavigation();

  const signupWithEmail = async (email, password, confirmPassword) => {
    setError(false);
    setUserMessage("");
    setEmailMessage("");
    setPasswordMessage("");
    setConfirmPasswordMessage("");
    let isValid = true;

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailMessage("Invalid email. Please use valid email.");
      isValid = false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordMessage(
        "Password must be minimum 8 characters with at least one uppercase letter, one lowercase letter, one, number, and one special character"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordMessage("Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      setUserMessage("Invalid form request. Please try again.");
      setError(true);
      return;
    }

    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    fetch(`${REACT_APP_API_URL}/user/register`, {
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
                navigation.navigate('Login');
            }
        })
        .catch((err) => {
            console.error('Error in signup', err);
            setUserMessage('Something went wrong while creating user account');
            setError(true);
        });
  };

  GoogleSignin.configure({
    webClientId:
      "993292350774-qhu55smntth2s3qqsp9k4mntm5lkqhlg.apps.googleusercontent.com",
  });

  const signupWithGoogle = async () => {
    setError(false);
    setUserMessage("");

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userInfo = await auth().signInWithCredential(googleCredential);

      fetch(`${REACT_APP_API_URL}/user/signin-with-google`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(userInfo.user),
      });
      navigation.navigate("Home");
    } catch (err) {
      console.error("Error in Google sign-in", err);
      setError(true);
    }
  };

  return (
    <NativeBaseProvider>
      <Stack
        direction="column"
        mt="0"
        space={10}
        backgroundColor={"white"}
        height={"100%"}
      >
        <Box alignItems="center">
          <View
            style={{
              maxWidth: "70%",
              maxHeight: 150,
            }}
          >
            <Image
              style={{
                flex: 1,
                resizeMode: "cover",
              }}
              alt="Logo"
              source={Logo}
            />
          </View>
          <FormControl isInvalid w="85%" maxW="350px" mb="5">
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Enter email"
              type="email"
              value={email}
              onChangeText={setEmail}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {emailMessage}
            </FormControl.ErrorMessage>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              placeholder="Enter password"
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {passwordMessage}
            </FormControl.ErrorMessage>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {confirmPasswordMessage}
            </FormControl.ErrorMessage>
          </FormControl>
          <Box w="85%">
            {error ? (
              <Text fontSize="md" color="red.600">
                {userMessage}
              </Text>
            ) : (
              <Text fontSize="md" color="black">
                {userMessage}
              </Text>
            )}
          </Box>
          <Box w="85%" mt="5">
            <Button
              backgroundColor={theme.colors.secondary}
              rounded="full"
              w="100%"
              p="4"
              onPress={() => signupWithEmail(email, password, confirmPassword)}
            >
              <Text color={theme.colors.text}>Sign Up</Text>
            </Button>
          </Box>
          <Box w="87%" mt="15">
            <GoogleSigninButton
              style={{ width: "100%", height: 60 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => signupWithGoogle()}
            />
          </Box>
        </Box>
      </Stack>
    </NativeBaseProvider>
  );
};

export default Signup;
