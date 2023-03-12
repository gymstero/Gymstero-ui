import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Workout from "./Workout";
import AddWorkoutPlan from "./AddWorkoutPlan";
import CreateWorkoutPlan from "./CreateWorkoutPlan";
import ViewWorkoutPlan from "./ViewWorkoutPlan";
import ChooseExerciseType from "./ChooseExerciseType";
import ChooseMuscle from "./ChooseMuscle";
import ChooseExercise from "./ChooseExercise";
import CreateExercise from "./CreateExercise";
import ModifyExercise from "./ModifyExercise";

import ExerciseNav from "../Exercise/ExerciseNav";

const Work = createNativeStackNavigator();

function WorkoutNav() {
  return (
    <Work.Navigator
      initialRouteName="WorkoutMainPage"
      screenOptions={{ headerShown: false }}
    >
      <Work.Screen name="WorkoutMainPage" component={Workout} />
      <Work.Screen name="AddWorkoutPlan" component={AddWorkoutPlan} />
      <Work.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlan} />
      <Work.Screen name="ViewWorkoutPlan" component={ViewWorkoutPlan} />

      <Work.Screen name="ExerciseNav" component={ExerciseNav} />

      <Work.Screen name="ChooseExerciseType" component={ChooseExerciseType} />
      <Work.Screen name="ChooseMuscle" component={ChooseMuscle} />
      <Work.Screen name="ChooseExercise" component={ChooseExercise} />
      <Work.Screen name="CreateExercise" component={CreateExercise} />
      <Work.Screen name="ModifyExercise" component={ModifyExercise} />
    </Work.Navigator>
  );
}

export default WorkoutNav;
