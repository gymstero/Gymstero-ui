import { Box, Button, Container, Flex, Image, Text, Spacer } from 'native-base';
import { googleLogout } from '../auth/auth';
import { useNavigation } from '@react-navigation/native';

const UserInfoPanel = ({
    userData,
    setEditMode,
    error,
    setError,
    userMessage,
    setUserMessage,
}) => {
    const navigation = useNavigation();

    const updateButtonPressed = () => {
        setEditMode(true);
    };

    return (
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
                        <Text fontSize={16} fontWeight={600} mb={1}>
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
                    <Flex flexDirection='row' alignItems='center'>
                        <Text fontSize={16} fontWeight={600}>
                            Public User
                        </Text>
                        <Spacer />
                        <Text>{userData.publicUser ? 'Yes' : 'No'}</Text>
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
                            onPress={() =>
                                googleLogout(
                                    setError,
                                    setUserMessage,
                                    navigation
                                )
                            }>
                            Log Out
                        </Button>
                        {error ? (
                            <Text mt={2} fontSize='sm' color='red.600'>
                                {userMessage}
                            </Text>
                        ) : (
                            <></>
                        )}
                    </Box>
                </Container>
            </Container>
        </>
    );
};

export default UserInfoPanel;
