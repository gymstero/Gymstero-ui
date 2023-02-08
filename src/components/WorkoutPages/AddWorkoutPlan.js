import { Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeBaseProvider, Text, View, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const AddWorkoutPlan = () => {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.createWorkoutButton}
            onPress={() => navigation.navigate('CreateWorkoutPlan') }
          >
            <Image
              source={require("../../images/victor-freitas-WvDYdXDzkhs-unsplash.jpg")}
              style={styles.createWorkoutImage}
            />
            <Text style={styles.buttonText}>Create your Workout Routine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addWorkoutButton}
            onPress={() => console.log("Add pre-built Workout plan pressed")}
          >
            <Image
              source={require("../../images/sam-moghadam-khamseh-vOZP2LojrHI-unsplash.jpg")}
              style={styles.addWorkoutImage}
            />
            <Text style={styles.buttonText}>Add pre-built Workout plan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentlyOpenedWorkoutsContainer}>
          <Text style={styles.recentlyOpenedWorkoutsTitle}>
            Recently Opened Workouts
          </Text>
          <View style={styles.recentlyOpenedWorkoutsList}>
            {/* List of recently opened workouts */}
            {/* You can add code to loop through and display the workouts here */}
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = {
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  createWorkoutButton: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
  },
  createWorkoutImage: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    overlayColor: "black",
  },
  addWorkoutButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
    flex: 1,
  },
  addWorkoutImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    flex: 1,
  },
  buttonText: {
    backgroundColor: "#2E2E2E",
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
    padding: 20,
    backgroundColor: "lightgrey",
  },
  recentlyOpenedWorkoutsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  recentlyOpenedWorkoutsList: {
    /* Add styles for the list of recently opened workouts */
  },
};

export default AddWorkoutPlan;
