import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from './src/components/Registration/Registration';
import LoginScreen from './src/components/Login/Login';
import GlobalContextProvider from './src/providers/GlobalContextProvider';
import ScheduledMovements from './src/components/ScheduledMovements/ScheduledMovements';
import Categories from './src/components/Categories/Categories';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <GlobalContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false, headerShadowVisible: false }}>
            {user ? (
              <></>
            ) : (
              <>
                <Stack.Screen
                  name="ScheduledMovements"
                  component={ScheduledMovements}
                />
                <Stack.Screen name="Categories" component={Categories} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registro" component={RegistrationScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GlobalContextProvider>
  );
}
