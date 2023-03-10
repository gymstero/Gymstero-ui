import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciseDetails from "./ExerciseDetails";
import { theme } from "../../theme/globalTheme";

const Work = createNativeStackNavigator();

const ExerciseNav = () => {
  return (
    <Work.Navigator
      initialRouteName="ExerciseDetails"
      screenOptions={{
        headerShown: false,
        backgroundColor: theme.colors.background,
      }}
    >
      <Work.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
    </Work.Navigator>
  );
};

export default ExerciseNav;
