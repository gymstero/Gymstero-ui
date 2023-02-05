import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Schedule from './Schedule';
import Social from './Social';
import Setting from './Setting/Setting';
import Workout from './Workout';
import UserNav from './User/UserNav';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name ='Dashboard' component={UserNav} 
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
                    ),
                  }}
            />
            <Tab.Screen name='Workout' component={Workout} 
                 options={{
                    tabBarLabel: 'Workout',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
                    ),
                  }}
            />
             <Tab.Screen name='Social' component={Social} 
             options={{
                tabBarLabel: 'Social',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-multiple" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen name='Schedule' component={Schedule} 
                 options={{
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="calendar-blank" color={color} size={size} />
                    ),
                  }}
            />
            <Tab.Screen name='Settings' component={Social} 
                 options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="cog" color={color} size={size} />
                    ),
                  }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabBar;
