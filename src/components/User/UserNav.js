import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './DashBoard';
import UserProfile from './UserProfile'

const User = createNativeStackNavigator();

function UserNav() {
  return (
      <User.Navigator initialRouteName='Home Board' screenOptions={{ headerShown: false }}>
        <User.Screen name="Home Board" component={Dashboard} />    
        <User.Screen name='UserProfile' component={UserProfile} />
      </User.Navigator>
  );
}

export default UserNav;