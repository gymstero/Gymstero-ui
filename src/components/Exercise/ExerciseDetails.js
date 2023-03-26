import React from "react";
import { useState } from "react";
import Video from "react-native-video";
import ExerciseData from "./exerciseData.json";
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import {
  NativeBaseProvider,
  Text,
  ScrollView,
  View,
  HStack,
  ArrowBackIcon,
  CheckIcon,
} from "native-base";
import { customStyles } from "../../theme/customStyles";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../theme/theme";
import LinearGradient from "react-native-linear-gradient";
import exerciseMedia from "../../exerciseContent/exerciseMedia";

const ExerciseDetails = () => {
  //Video dimension calculation
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const height = (width * 9) / 10;
    setDimensions({ width, height });
  };

  const { width, height } = dimensions;
  //--------------------------------

  //description toggle, Instruction toggle, warnings toggle
  function useToggle(initialState) {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
  }

  const [showFullDescription, toggleDescription] = useToggle(false);
  const [showFullInstructions, toggleInstructions] = useToggle(false);
  const [showFullWarning, toggleWarning] = useToggle(false);

  const { description, instructions, warning } = ExerciseData;

  const descriptionToShow = showFullDescription
    ? description
    : `${description.slice(0, 100)}...`;

  const instructionsToDisplay = showFullInstructions
    ? instructions
    : instructions.slice(0, 1);

  const warningsToDisplay = showFullWarning ? warning : warning.slice(0, 1);
  //-------------------------------------------
  return (
    <NativeBaseProvider>
      <ScrollView style={{ backgroundColor: "white" }}>
        <HStack alignItems={"center"}>
          <Pressable>
            <ArrowBackIcon ml={2} color={theme.colors.primary} size={7} />
          </Pressable>

          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={[customStyles.header, { color: "black" }]}>
              {ExerciseData.title}
            </Text>
          </View>
          <Pressable>
            <CheckIcon mr={2} color={theme.colors.primary} size={7} />
          </Pressable>
        </HStack>

        <View style={{ flex: 1 }} onLayout={onLayout}>
          <Video
            source={exerciseMedia["ptixVI5fnk43gT9Y2GJO"].video} // just update the source for example source={{ uri: 'http://www.example.com/video.mp4' }}
            style={{ width, height }}
            resizeMode="cover"
            repeat={true}
            // playInBackground={true}
          />
        </View>

        <TouchableOpacity
          onPress={toggleDescription}
          style={{ marginTop: 5 }}
          activeOpacity={0.5}
        >
          <Text style={ExerciseStyles.header}>
            Description{" "}
            <FontAwesome
              name={showFullDescription ? "chevron-up" : "chevron-down"}
              style={[
                ExerciseStyles.chevron,
                { color: theme.colors.secondary },
              ]}
            />
          </Text>

          <View style={ExerciseStyles.descriptionContainer}>
            {showFullDescription ? (
              <Text style={ExerciseStyles.descriptionText}>
                {descriptionToShow}
              </Text>
            ) : (
              <Text style={ExerciseStyles.descriptionText}>
                {`${descriptionToShow.slice(0, 100)}\nRead More ...`}
              </Text>
            )}

            {showFullDescription ? null : (
              <LinearGradient
                colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
                style={ExerciseStyles.descriptionGradient}
              />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleInstructions} activeOpacity={0.5}>
          <Text style={ExerciseStyles.header}>
            Instructions{" "}
            <FontAwesome
              name={showFullInstructions ? "chevron-up" : "chevron-down"}
              style={[
                ExerciseStyles.chevron,
                { color: theme.colors.secondary },
              ]}
            />
          </Text>

          {instructionsToDisplay.map((instruction, index) => (
            <View key={index} style={ExerciseStyles.instructionItemContainer}>
              <Text style={ExerciseStyles.instructionCounter}>{`${
                index + 1
              }. `}</Text>
              {showFullInstructions ? (
                <Text style={ExerciseStyles.instructionText}>
                  {instruction}
                </Text>
              ) : (
                <Text style={ExerciseStyles.instructionText}>
                  {`${instruction.slice(0, 100)}\nRead More ...`}
                </Text>
              )}

              {showFullInstructions ? null : (
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
                  style={ExerciseStyles.instructionGradient}
                />
              )}
            </View>
          ))}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleWarning}
          activeOpacity={0.5}
          style={ExerciseStyles.container}
        >
          <Text style={ExerciseStyles.header}>
            Warnings{" "}
            <FontAwesome
              name={showFullWarning ? "chevron-up" : "chevron-down"}
              style={[
                ExerciseStyles.chevron,
                { color: theme.colors.secondary },
              ]}
            />
          </Text>

          {warningsToDisplay.map((warning, index) => (
            <View key={index} style={ExerciseStyles.warningItemsContainer}>
              <FontAwesome name="circle" style={ExerciseStyles.bulletPoint} />
              {showFullWarning ? (
                <Text style={ExerciseStyles.warningText}>{warning}</Text>
              ) : (
                <Text style={ExerciseStyles.warningText}>
                  {`${warning.slice(0, 100)}\nRead More ...`}
                </Text>
              )}

              {showFullWarning ? null : (
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
                  style={ExerciseStyles.warningGradient}
                />
              )}
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
  );
};
const ExerciseStyles = StyleSheet.create({
  header: {
    width: "100%",
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: "bold",
    // textAlign: "center",
    padding: 20,
    marginLeft: 20,
  },
  chevron: {
    fontSize: 18,
    marginLeft: 5,
    color: "gray",
  },
  descriptionContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    overflow: "hidden",
    margin: 10,
    backgroundColor: theme.colors.primary,
  },
  descriptionGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  descriptionText: {
    color: theme.colors.text,
    fontSize: 14,
    padding: 10,
  },

  instructionItemContainer: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    borderColor: "grey",
    padding: 20,
    overflow: "hidden",
  },
  instructionGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  instructionCounter: {
    color: theme.colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  instructionText: {
    color: theme.colors.text,
    fontSize: 14,

    paddingRight: 15,
  },
  warningItemsContainer: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    borderColor: "grey",
    padding: 10,
    overflow: "hidden",
    margin: 10,
  },
  warningGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  bulletPoint: {
    color: theme.colors.secondary,
    fontSize: 10,
  },
  warningText: {
    color: theme.colors.text,
    fontSize: 14,
    padding: 10,
  },
});

export default ExerciseDetails;
