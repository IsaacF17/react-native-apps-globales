import GlobalContextProvider from './src/providers/GlobalContextProvider';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Screens } from './src/components/Navigation/Screens/Screens';

export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <Screens />
        </NavigationContainer>
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
}
