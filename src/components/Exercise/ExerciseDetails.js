import React from "react";
import { useState } from "react";
import Video from "react-native-video";
import benchPressVideo from "./BenchPressVideo.mp4";
import ExerciseData from "./exerciseData.json";
import { StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import {
  NativeBaseProvider,
  Icon,
  Body,
  Button,
  Title,
  Right,
  Text,
  ScrollView,
  View,
  Left,
} from "native-base";
import MyHeader from "../Layout/MyHeader";
import { customStyles } from "../../theme/customStyles";

const ExerciseDetails = ({ navigation }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const height = (width * 9) / 10;
    setDimensions({ width, height });
  };
  const { width, height } = dimensions;
  return (
    <NativeBaseProvider>
      <ScrollView style={{ flex: 1 }}>
        <View style={customStyles.container}>
          <Text style={customStyles.header}>{ExerciseData.title}</Text>
        </View>

        <View style={{ flex: 1 }} onLayout={onLayout}>
          <Video
            source={benchPressVideo} // just update the source for example source={{ uri: 'http://www.example.com/video.mp4' }}
            style={{ width, height }}
            resizeMode="cover"
            repeat={true}
            // playInBackground={true}
          />
        </View>
        <View style={customStyles.container}>
          <Text style={customStyles.header}>Description</Text>
          <Text style={customStyles.body}>{ExerciseData.description}</Text>
        </View>
        <View style={customStyles.container}>
          <Text style={customStyles.header}>Instructions</Text>
          {ExerciseData.instructions.map((instruction, index) => (
            <Text style={customStyles.body} key={index}>
              {instruction}
            </Text>
          ))}
        </View>
        <View style={customStyles.container}>
          <Text style={customStyles.header}>Warnings</Text>
          {ExerciseData.warning.map((warning, index) => (
            <Text style={customStyles.body} key={index}>
              {warning}
            </Text>
          ))}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ExerciseDetails;
