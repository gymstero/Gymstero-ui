import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthOptions from "./src/components/auth/AuthOptions";
import Signup from "./src/components/auth/Signup";
import Login from "./src/components/auth/Login";
import BottomTabBar from "./src/components/BottomTabBar";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true}}
      >
        <Stack.Screen name="Authentication" component={AuthOptions} />
        <Stack.Screen name="Sign-up" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
