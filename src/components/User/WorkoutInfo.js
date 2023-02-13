import React from 'react';
import { Container, Text, HStack, VStack, AddIcon, Flex } from 'native-base';
const WorkoutInfo = ({ workouts }) => {
    const dateBuilder = (date) => {
        return `${new Date(date).getFullYear()}/${new Date(
            date
        ).getMonth()}/${new Date(date).getDate()}`;
    };

    return (
        <VStack space={4} w='100%'>
            <Text fontSize={20} fontWeight={600}>
                My Workouts
            </Text>
            {workouts.map((workout) => (
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
                                {workout.title}
                            </Text>
                            <AddIcon size='lg' />
                        </Flex>
                        <Text>{dateBuilder(workout.createdAt)}</Text>
                    </VStack>
                </HStack>
            ))}
        </VStack>
    );
};

export default WorkoutInfo;
