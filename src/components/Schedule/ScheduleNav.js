import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Schedule from './Schedule';

const Work = createNativeStackNavigator();

function ScheduleNav() {
    return (
        <Work.Navigator
            initialRouteName='ScheduleMainPage'
            screenOptions={{ headerShown: false }}>
            <Work.Screen name='ScheduleMainPage' component={Schedule} />
        </Work.Navigator>
    );
}

export default ScheduleNav;
