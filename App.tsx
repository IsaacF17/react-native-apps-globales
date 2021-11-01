import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from './src/components/Registration/Registration';
import LoginScreen from './src/components/Login/Login';
import GlobalContextProvider from './src/providers/GlobalContextProvider';
import ScheduledMovements from './src/components/ScheduledMovements/ScheduledMovements';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, headerShadowVisible: false }}
        >
          {user ? (
            <></>
          ) : (
            <>
              <Stack.Screen
                name="ScheduledMovements"
                component={ScheduledMovements}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registro" component={RegistrationScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
