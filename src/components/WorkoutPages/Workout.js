import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => navigation.navigate('AddWorkoutPlan')}
        >
          <Text style={styles.addButtonText}>ADD WORKOUT PLAN</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <Text key={index} style={styles.workout}>
                {workout}
              </Text>
            ))
          ) : (
            <Text style={styles.title}>Nothing Here Yet</Text>
          )}
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = {
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "",
    marginBottom: 20,
  },
  workout: {
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#050D13",
    width: "100%",
    height: 60,
    borderRadius: 2,
    padding: 20,
  },
  addButtonText: {
    alignItems: "center",
    color: "#FFF0EE",
    fontWeight: "",
  },
};

export default WorkoutPage;
