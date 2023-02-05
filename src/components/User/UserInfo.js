import React from 'react';
import { Container, Flex, Text, HStack, VStack, ShareIcon } from 'native-base';
const UserInfo = () => {
    return (
        <VStack space={4} w='100%'>
            <Text fontSize={20} fontWeight={600}>
                Following Users
            </Text>
            <HStack
                style={{
                    borderColor: 'gray.100',
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                }}>
                <Container w={5} bg='gray.300' />
                <VStack w='90%' ml={2} py={2} px={3} space={2}>
                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        borderBottomWidth={0.5}>
                        <Text fontSize={18} fontWeight={600}>
                            Blake
                        </Text>
                        <HStack>
                            <ShareIcon size='lg' mr={4} />
                            <Text fontSize={16}>{'23'}</Text>
                        </HStack>
                    </Flex>
                    <Text>What to add here?</Text>
                </VStack>
            </HStack>
            <HStack
                style={{
                    borderColor: 'gray.100',
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                }}>
                <Container w={5} bg='gray.300' />
                <VStack w='90%' ml={2} py={2} px={3} space={2}>
                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        borderBottomWidth={0.5}>
                        <Text fontSize={18} fontWeight={600}>
                            Rachel
                        </Text>
                        <HStack>
                            <ShareIcon size='lg' mr={4} />
                            <Text fontSize={16}>{'10'}</Text>
                        </HStack>
                    </Flex>
                    <Text>What to add here?</Text>
                </VStack>
            </HStack>
        </VStack>
    );
};



  export default UserInfo;