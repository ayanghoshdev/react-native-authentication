import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import SignupScreen from './screen/SignupScreen';
import TestsScreen from './screen/TestsScreen';
import LoginScreen from './screen/LoginScreen';
import {useAuth} from './contexts/authContext';
import NotificationsScreen from './screen/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const {loading, isLoggedIn} = useAuth();
  if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
        <Stack.Screen name="Tests" component={TestsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
