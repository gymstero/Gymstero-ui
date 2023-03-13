import { useNavigation, useRoute } from "@react-navigation/native";
import {
    NativeBaseProvider,
    ScrollView,
    VStack,
    Button,
    View,
    Heading,
    Box,
} from 'native-base';
import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Video from 'react-native-video';
import VIDEOS from '../../../trainingVideos';
const RunExercise = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [exercises, setExercises] = useState([]);
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [key, setKey] = useState(0);
    const [reveal, setReveal] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [videoSource, setVideoSource] = useState('');

    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        const height = (width * 9) / 10;
        setDimensions({ width, height });
    };
    const { width, height } = dimensions;

    const goToNextExercise = () => {
        if (count < exercises.length - 1) {
            let num = count + 1;
            setCount(num);
            setIsPlaying(false);
            setReveal(false);
            setKey((prevKey) => prevKey + 1);
        }
    };

    const revealTimer = () => {
        setTimer(exercises[count].estimatedTime * 60);
        setReveal(true);

        setIsPlaying(true);
    };

    const toggleTimer = () => {
        setTimer(exercises[count].estimatedTime * 60);
        setIsPlaying((prev) => !prev);
    };

    const convertTime = (remainingTime) => {
        const mins = parseInt(remainingTime / 60);
        let secs = remainingTime % 60;
        return secs < 10 ? `${mins}:0${secs}` : `${mins}:${secs}`;
    };

    useEffect(() => {
        setExercises(route.params.exercises);
        console.log(route.params.exercises);
    }, [route]);
    return (
        <NativeBaseProvider>
            <ScrollView>
                {exercises && exercises.length > 0 ? (
                    <VStack>
                        <Heading mx='auto' mt={4}>
                            {exercises[count].exerciseInfo.title}
                        </Heading>
                        <Box mx={8} mt={4}>
                            <Text mt={2}>
                                Target Sets:{' '}
                                {exercises[count].targetSets
                                    ? exercises[count].targetSets
                                    : 'Not Set'}
                            </Text>
                            <Text>
                                Estimated Time:{' '}
                                {exercises[count].estimatedTime
                                    ? `${exercises[count].estimatedTime} mins`
                                    : 'Not Set'}
                            </Text>
                        </Box>
                    </VStack>
                ) : (
                    <></>
                )}
                {count == exercises.length - 1 ? (
                    <Button
                        w='85%'
                        mx='auto'
                        mt={4}
                        onPress={() => navigation.navigate('WorkoutMainPage')}>
                        {' '}
                        Done
                    </Button>
                ) : (
                    <Button w='85%' mx='auto' mt={4} onPress={goToNextExercise}>
                        Next Exercise
                    </Button>
                )}
                <VStack w='85%' mx='auto' mt={20}>
                    {reveal ? (
                        <View
                            style={{ flex: 1, alignSelf: 'center' }}
                            onLayout={onLayout}>
                            <CountdownCircleTimer
                                key={key}
                                isPlaying={isPlaying}
                                duration={timer}
                                colors={[
                                    '#004777',
                                    '#F7B801',
                                    '#A30000',
                                    '#A30000',
                                ]}
                                colorsTime={[10, 6, 3, 0]}
                                onComplete={() => ({
                                    shouldRepeat: true,
                                    delay: 2,
                                })}
                                updateInterval={0}>
                                {({ remainingTime, color }) => (
                                    <Text style={{ color, fontSize: 40 }}>
                                        {convertTime(remainingTime)}
                                    </Text>
                                )}
                            </CountdownCircleTimer>
                            {isPlaying ? (
                                <Button mt={4} onPress={toggleTimer}>
                                    Pause
                                </Button>
                            ) : (
                                <Button mt={4} onPress={toggleTimer}>
                                    Resume
                                </Button>
                            )}
                        </View>
                    ) : (
                        <View style={{ flex: 1 }} onLayout={onLayout}>
                            <Video
                                source={VIDEOS['9vnKR3QgneTKWChp4X1M']} // just update the source for example source={{ uri: 'http://www.example.com/video.mp4' }}
                                style={{ width, height }}
                                resizeMode='cover'
                                repeat={true}
                                // playInBackground={true}
                            />
                            <Button onPress={revealTimer}>Start</Button>
                        </View>
                    )}
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default RunExercise;