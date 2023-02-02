import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthOptions from './src/components/auth/AuthOptions'
import Signup from './src/components/auth/Signup';
import Login from './src/components/auth/Login';
import Dashboard from './src/components/DashBoard';
import UserProfile from './src/components/User/UserProfile';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='User Profile'>
        <Stack.Screen name="Authentication" component={AuthOptions} />
        <Stack.Screen name="Sign-up" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="User Profile" component={UserProfile} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
