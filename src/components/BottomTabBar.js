import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Schedule from './Schedule';
import Social from './Social';
import Setting from './Setting';
import Workout from './Workout';
import UserProfile from './UserProfile';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name='Workout' component={Workout} />
            <Tab.Screen name='Schedule' component={Schedule} />
            <Tab.Screen name='Social' component={Social} />
            <Tab.Screen name='UserProfile' component={UserProfile} />
            <Tab.Screen name='Settings' component={Setting} />
        </Tab.Navigator>
    );
};

export default BottomTabBar;
