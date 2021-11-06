import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../../Login/Login';
import { RegistrationScreen } from '../../Registration/Registration';
import { BottomBar } from '../Bottombar/BottomBar';

export const Screens = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={BottomBar} />
    </Stack.Navigator>
  );
};
