import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    Switch,
    Text,
    Input,
    TextArea,
    Spacer,
} from 'native-base';
import { getUser, getIdToken } from "../auth/auth";
import { theme } from "../../theme/theme";
import { REACT_APP_API_URL } from '../../../config';

const UpdatePanel = ({ userData, setUserData, setEditMode }) => {
  const saveButtonPressed = async () => {
    const userInfo = await getUser();
    const idToken = await getIdToken();

    fetch(`${REACT_APP_API_URL}/api/user/${userInfo.uid}/setting`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(userData),
    })
        .then((res) => res.json())
        .then((res) => console.log('User data saved', res))
        .catch((err) => {
            console.error(err);
        });

    setEditMode(false);
  };

  return (
    <>
      <Container mt={5}>
        <Flex flexDirection="row">
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
            source={{
              uri:
                (userData && userData.photoURL) ||
                "https://img.icons8.com/ios-glyphs/90/000000/user--v1.png",
            }}
            alt="user profile"
            flex={2}
          />
          <Container mx={5} flex={3} my="auto">
            <Text fontSize={16} fontWeight={600} mb={1}>
              Username
            </Text>
            <Input
              alignSelf="center"
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
        <Box width="100%" height={100} shadow={2}>
          <TextArea
            h={20}
            width="100%"
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
        <Flex flexDirection="row" alignItems="center">
          <Text fontSize={16} fontWeight={600} mb={1}>
            Public User
          </Text>
          <Spacer />
          <Switch
            size="lg"
            value={userData.publicUser}
            colorScheme={"red"}
            onToggle={(value) =>
              setUserData({
                ...userData,
                publicUser: value,
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
          type="password"
          alignSelf="center"
          value={userData.password}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              password: text,
            })
          }
        />
      </Container>
      <Container mt={5} mx="auto">
        <Button
          backgroundColor={theme.colors.secondary}
          color={theme.colors.text}
          width={200}
          onPress={saveButtonPressed}
        >
          Update
        </Button>
      </Container>
    </>
  );
};

export default UpdatePanel;
