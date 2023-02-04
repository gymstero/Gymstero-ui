import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './DashBoard';

const User = createNativeStackNavigator();

function UserNav() {
  return (
      <User.Navigator initialRouteName='Home Board' screenOptions={{ headerShown: false }}>
        <User.Screen name="Home Board" component={Dashboard} />    
      </User.Navigator>
  );
}

export default UserNav;