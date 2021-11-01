import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from './src/components/Registration/Registration';
import LoginScreen from './src/components/Login/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalContextProvider from './src/providers/GlobalContextProvider';
// import ScheduledMovements from './src/components/ScheduledMovements/ScheduledMovements';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <></>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registro" component={RegistrationScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
}
