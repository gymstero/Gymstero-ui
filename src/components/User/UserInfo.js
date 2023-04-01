import React from "react";
import { Container, Flex, Text, HStack, VStack, ShareIcon } from 'native-base';
import { theme } from '../../theme/theme';

const UserInfo = (props) => {
    const { title, users } = props;

    return (
        <VStack space={4} w='100%'>
            <Text fontSize={20} fontWeight={600}>
                {title}
            </Text>
            {users.map((user) => {
                return (
                    <HStack
                        key={user.id}
                        style={{
                            borderColor: 'gray.100',
                            borderStyle: 'solid',
                            borderWidth: 0.5,
                        }}>
                        <Container w={5} bg={theme.colors.primary} />
                        <VStack w='90%' ml={2} py={2} px={3} space={2}>
                            <Flex
                                flexDirection='row'
                                justifyContent='space-between'
                                borderBottomWidth={0.5}>
                                <Text fontSize={18} fontWeight={600}>
                                    {user.username}
                                </Text>
                                <HStack>
                                    <ShareIcon size='lg' mr={4} />
                                    <Text fontSize={16}>
                                        {user.numOfFollowers}
                                    </Text>
                                </HStack>
                            </Flex>
                            <Text>{user.description}</Text>
                        </VStack>
                    </HStack>
                );
            })}
        </VStack>
    );
};

export default UserInfo;
