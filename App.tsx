import GlobalContextProvider from './src/providers/GlobalContextProvider';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { BottomBar } from './src/components/BottomBar/BottomBar';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <BottomBar isVisble={user ? false : true} />
        </NavigationContainer>
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
}
