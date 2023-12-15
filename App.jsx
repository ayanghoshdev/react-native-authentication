import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import SignupScreen from './src/screen/SignupScreen';
import LoginScreen from './src/screen/LoginScreen';
import {useAuth} from './src/contexts/authContext';
import NotificationsScreen from './src/screen/NotificationsScreen';
import TestDetailsScreen from './src/screen/TestDetailsScreen';
import CreateTestScreen from './src/screen/CreateTestScreen';
import TestList from './src/screen/TestList';

const Stack = createNativeStackNavigator();

export default function App() {
  const {loading, user} = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
        <Stack.Screen name="CreateTest" component={CreateTestScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="TestList" component={TestList} />
        <Stack.Screen name="TestDetails" component={TestDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
