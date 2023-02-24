import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ScheduleNav from "./Schedule/ScheduleNav";
import Social from "./Social";
import Setting from "./Setting/Setting";
import WorkoutNav from "./WorkoutPages/WorkoutNav";
import UserNav from "./User/UserNav";

import { theme } from "../theme/theme";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",

        tabBarActiveTintColor: "#D23812",
        tabBarInactiveTintColor: theme.colors.text,
        tabBarPosition: "bottom",
        tabBarStyle: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={UserNav}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutNav}
        options={{
          tabBarLabel: "Workout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarLabel: "Social",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleNav}
        options={{
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-blank"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
