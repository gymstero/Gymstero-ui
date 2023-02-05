import React from 'react';
import {
    Box,
    Container,
    Text,
    HStack,
    VStack,
    AddIcon,
    Spacer,
    TextArea,
    Button,
    Flex,
} from 'native-base';
const WorkoutInfo = () => {
    return (
        <VStack space={4} w='100%'>
            <Text fontSize={20} fontWeight={600}>
                My Workouts
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
                            Tuesday
                        </Text>
                        <AddIcon size='lg' />
                    </Flex>
                    <Text>2022/10/06</Text>
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
                            Upper body
                        </Text>
                        <AddIcon size='lg' />
                    </Flex>
                    <Text>2022/10/06</Text>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default WorkoutInfo;
