import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Schedule from './Schedule';
import CreateScheduleItem from './CreateScheduleItem';

const Work = createNativeStackNavigator();

function ScheduleNav() {
    return (
        <Work.Navigator
            initialRouteName='ScheduleMainPage'
            screenOptions={{ headerShown: false }}>
            <Work.Screen name='ScheduleMainPage' component={Schedule} />
            <Work.Screen name='ScheduleWorkout' component={CreateScheduleItem} />
        </Work.Navigator>
    );
}

export default ScheduleNav;
