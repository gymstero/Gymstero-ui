import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workout from "./Workout";
import AddWorkoutPlan from "./AddWorkoutPlan";
import CreateWorkoutPlan from './CreateWorkoutPlan';
import ViewWorkoutPlan from './ViewWorkoutPlan';
import ChooseExerciseType from './ChooseExerciseType';
import ChooseMuscle from './ChooseMuscle';
import ChooseExercise from './ChooseExercise';
const Work = createNativeStackNavigator();

function WorkoutNav() {
    return (
        <Work.Navigator
            initialRouteName='WorkoutMainPage'
            screenOptions={{ headerShown: false }}>
            <Work.Screen name='WorkoutMainPage' component={Workout} />
            <Work.Screen name='AddWorkoutPlan' component={AddWorkoutPlan} />
            <Work.Screen name='CreateWorkoutPlan' component={CreateWorkoutPlan} />
            <Work.Screen name='ViewWorkoutPlan' component={ViewWorkoutPlan} />

            <Work.Screen name='ChooseExerciseType' component={ChooseExerciseType} />
            <Work.Screen name='ChooseMuscle' component={ChooseMuscle} />
            <Work.Screen name='ChooseExercise' component={ChooseExercise} />
        </Work.Navigator>
    );
}

export default WorkoutNav;
