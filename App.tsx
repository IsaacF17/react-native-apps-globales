import GlobalContextProvider from './src/providers/GlobalContextProvider';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Screens } from './src/components/Navigation/Screens/Screens';
import NewMovementProvider from './src/providers/NewMovementProvider';

export default function App() {
  return (
    <GlobalContextProvider>
      <SafeAreaProvider>
        <NewMovementProvider>
          <NavigationContainer>
            <StatusBar />
            <Screens />
          </NavigationContainer>
        </NewMovementProvider>
      </SafeAreaProvider>
    </GlobalContextProvider>
  );
}
