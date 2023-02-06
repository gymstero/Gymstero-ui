import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthOptions from "./src/components/auth/AuthOptions";
import Signup from "./src/components/auth/Signup";
import Login from "./src/components/auth/Login";
import BottomTabBar from "./src/components/BottomTabBar";
import Workout from "./src/components/WorkoutPages/Workout";
import AddWorkoutPlan from "./src/components/WorkoutPages/AddWorkoutPlan";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Authentication" component={AuthOptions} />
        <Stack.Screen name="Sign-up" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabBar} />
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
