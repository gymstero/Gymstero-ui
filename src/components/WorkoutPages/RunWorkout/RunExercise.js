import { useNavigation, useRoute } from "@react-navigation/native";
import {
  NativeBaseProvider,
  ScrollView,
  VStack,
  Button,
  View,
  Heading,
  HStack,
} from "native-base";
import { Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Video from "react-native-video";
import exerciseMedia from "../../../exerciseContent/exerciseMedia";
import { theme } from "../../../theme/theme";
import { customStyles } from "../../../theme/customStyles";

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
  const [playVideo, setPlayVideo] = useState(false);

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
      setPlayVideo(true);
    }
  };

  const revealTimer = () => {
    setTimer(exercises[count].estimatedTime * 60);
    setReveal(true);
    setPlayVideo(true);
    setIsPlaying(true);
  };

  const toggleTimer = () => {
    setTimer(exercises[count].estimatedTime * 60);
    setIsPlaying((prev) => !prev);
    setPlayVideo((prev) => !prev);
  };

  const convertTime = (remainingTime) => {
    const mins = parseInt(remainingTime / 60);
    let secs = remainingTime % 60;
    return secs < 10 ? `${mins}:0${secs}` : `${mins}:${secs}`;
  };

  useEffect(() => {
    setPlayVideo(true);
    setExercises(route.params.exercises);
    console.log(route.params.exercises);
  }, [route]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        {exercises && exercises.length > 0 ? (
          <>
            <Heading mx="auto" mb={5}>
              {exercises[count].exerciseInfo.title}
            </Heading>
            <View style={{ flex: 1 }} onLayout={onLayout}>
              <Video
                source={exerciseMedia[exercises[count].exerciseId].video}
                style={{ width, height }}
                resizeMode="cover"
                paused={!playVideo}
                repeat={true}

                // playInBackground={true}
              />
            </View>
            <View style={customStyles.container}>
              <HStack alignItems={"center"}>
                <VStack>
                  <HStack
                    ml={7}
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    p={1}
                  >
                    <Text style={styles.exerciseText}>Estimated Time </Text>
                    {exercises[count].estimatedTime ? (
                      <View style={styles.infoContainer}>
                        <Text style={styles.exerciseInfoText}>
                          {exercises[count].estimatedTime} mins
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.infoEmptyContainer}>
                        <Text style={styles.exerciseEmptyText}>Not Set</Text>
                      </View>
                    )}
                  </HStack>
                  <HStack
                    ml={7}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={1}
                  >
                    <Text style={styles.exerciseText}>Target Sets</Text>
                    {exercises[count].targetSets ? (
                      <View style={styles.infoContainer}>
                        <Text style={styles.exerciseInfoText}>
                          {exercises[count].targetSets}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.infoEmptyContainer}>
                        <Text style={styles.exerciseEmptyText}>Not Set</Text>
                      </View>
                    )}
                  </HStack>
                </VStack>
                <VStack mr={5} ml={2}>
                  <CountdownCircleTimer
                    key={key}
                    isPlaying={isPlaying}
                    duration={timer}
                    // colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    size={120}
                    colors={"#041326"}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({
                      shouldRepeat: true,
                      delay: 2,
                    })}
                    updateInterval={0}
                  >
                    {({ remainingTime, color }) => (
                      <Text style={{ color, fontSize: 40 }}>
                        {convertTime(remainingTime)}
                      </Text>
                    )}
                  </CountdownCircleTimer>
                </VStack>
              </HStack>

              {isPlaying ? (
                <Button
                  backgroundColor={theme.colors.secondary}
                  mt={3}
                  onPress={toggleTimer}
                  w={"100%"}
                >
                  Pause
                </Button>
              ) : !reveal ? (
                <Button
                  backgroundColor={theme.colors.primary}
                  mt={3}
                  w={"100%"}
                  onPress={revealTimer}
                >
                  Start Workout
                </Button>
              ) : (
                <Button
                  backgroundColor={theme.colors.secondary}
                  mt={3}
                  onPress={toggleTimer}
                  w={"100%"}
                >
                  Resume
                </Button>
              )}

              {count == exercises.length - 1 ? (
                <Button
                  w={"100%"}
                  mt={2}
                  onPress={() => navigation.navigate("WorkoutMainPage")}
                  backgroundColor={"green.700"}
                >
                  Done
                </Button>
              ) : (
                <Button
                  backgroundColor={"#046cc7"}
                  w={"100%"}
                  mt={2}
                  onPress={goToNextExercise}
                >
                  Next Exercise
                </Button>
              )}
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default RunExercise;

const styles = {
  exerciseText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "bold",
    // justifyContent: "flex-start",
  },
  exerciseInfoText: {
    minFontSize: 10,
    maxFontSize: 16,
    //color: "#03fc39",
    color: "#cb1dde",
    padding: 10,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    borderRadius: 10,
    // justifyContent: "flex-end",
    width: 100,
    // maxWidth: 30,
  },
  infoEmptyContainer: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    borderRadius: 10,
    // justifyContent: "flex-end",
    width: 100,
    // maxWidth: 30,
  },
  exerciseEmptyText: {
    minFontSize: 10,
    maxFontSize: 16,
    //color: "#03fc39",
    color: theme.colors.secondary,
    padding: 10,
  },
};
