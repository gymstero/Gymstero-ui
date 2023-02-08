import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workout from "./Workout";
import AddWorkoutPlan from "./AddWorkoutPlan";
import CreateWorkoutPlan from './CreateWorkoutPlan';
const Work = createNativeStackNavigator();

function WorkoutNav() {
    return (
        <Work.Navigator
            initialRouteName='WorkoutMainPage'
            screenOptions={{ headerShown: false }}>
            <Work.Screen name='WorkoutMainPage' component={Workout} />
            <Work.Screen name='AddWorkoutPlan' component={AddWorkoutPlan} />
            <Work.Screen name='CreateWorkoutPlan' component={CreateWorkoutPlan} />
        </Work.Navigator>
    );
}

export default WorkoutNav;
