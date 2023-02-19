import { Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeBaseProvider, Text, View, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "../Layout/ImageButton";
import { customStyles } from "../../theme/customStyles";

const AddWorkoutPlan = () => {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={customStyles.container}>
          <ImageButton
            imageSource={require("../../images/victor-freitas-WvDYdXDzkhs-unsplash.jpg")}
            text="Create your Workout Routine"
            onPress={() => navigation.navigate("CreateWorkoutPlan")}
            textStyle={styles.buttonText}
            buttonStyle={{
              height: 100,
            }}
          />
          <ImageButton
            imageSource={require("../../images/sam-moghadam-khamseh-vOZP2LojrHI-unsplash.jpg")}
            text="Add pre-built Workout plan"
            onPress={() => console.log("Add pre-built Workout plan pressed")}
            textStyle={styles.buttonText}
            buttonStyle={{
              height: 100,
            }}
            imageStyle={{
              opacity: 0.4,
            }}
          />
        </View>
        <View style={styles.recentlyOpenedWorkoutsContainer}>
          <Text style={styles.recentlyOpenedWorkoutsTitle}>
            Recently Opened Workouts
          </Text>

          <View style={styles.recentlyOpenedWorkoutsList}>
            {/* List of recently opened workouts */}
            {/* You can add code to loop through and display the workouts here */}
            <Button onPress={() => navigation.navigate("ExerciseNav")}>
              <Text>Barbell Bench Press</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = {
  buttonText: {
    color: "#FFF0EE",
    fontWeight: "",
    textAlign: "center",
    marginTop: 10,
    position: "absolute",
    top: "30%",
    left: "16%",
    fontSize: 20,
  },
  recentlyOpenedWorkoutsContainer: {
    marginTop: 0,
    padding: 1,
  },
  recentlyOpenedWorkoutsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 20,
    textAlign: "center",
    backgroundColor: "lightgrey",
  },
  recentlyOpenedWorkoutsList: {
    /* Add styles for the list of recently opened workouts */
  },
};

export default AddWorkoutPlan;
