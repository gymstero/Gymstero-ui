import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Schedule from './Schedule';
import Social from './Social';
//import Setting from './Setting';
import Workout from './Workout';
import UserNav from './User/UserNav';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name ='Dashboard' component={UserNav} />
            <Tab.Screen name='Workout' component={Workout} />
            <Tab.Screen name='Schedule' component={Schedule} />
            <Tab.Screen name='Social' component={Social} />
            <Tab.Screen name='Settings' component={Social} />
        </Tab.Navigator>
    );
};

export default BottomTabBar;
