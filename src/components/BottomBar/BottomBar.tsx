import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LoginScreen from '../Login/Login';
import { Icon } from 'react-native-elements';
import HomeScreen from '../Home/Home';
import { RegistrationScreen } from '../Registration/Registration';

const Tab = createMaterialBottomTabNavigator();

interface barProps {
  isVisble?: boolean;
}

export function BottomBar(props: barProps) {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      inactiveColor="black"
      activeColor="white"
      barStyle={{
        display: props.isVisble ? 'flex' : 'none',
        backgroundColor: '#1E2749',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="home" type="font-awesome" color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Fijos"
        component={LoginScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="thumb-tack" type="font-awesome" color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo"
        component={RegistrationScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="plus-circle" type="font-awesome" color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Categorías"
        component={RegistrationScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="tags" type="font-awesome" color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Reportes"
        component={RegistrationScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="bar-chart" type="font-awesome" color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
