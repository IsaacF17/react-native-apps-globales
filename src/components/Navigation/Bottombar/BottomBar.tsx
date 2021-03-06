import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../../Home/Home';
import { Icon } from 'react-native-elements';
import { RegistrationScreen } from '../../Registration/Registration';
import ScheduledMovements from '../../ScheduledMovements/ScheduledMovements';
import Categories from '../../Categories/Categories';
import { Reports } from '../../Reports/Reports';
import NewMovementContext from '../../../contexts/NewMovementContext';

const Tab = createMaterialBottomTabNavigator();

export function BottomBar() {
  const { setIsModalOpen } = useContext(NewMovementContext);

  return (
    <Tab.Navigator
      initialRouteName="Login"
      inactiveColor="black"
      activeColor="white"
      barStyle={{
        backgroundColor: '#142629',
      }}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="home"
              type="font-awesome"
              color="white"
              tvParallaxProperties={undefined}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fijos"
        component={ScheduledMovements}
        options={{
          tabBarIcon: () => (
            <Icon
              name="thumb-tack"
              type="font-awesome"
              color="white"
              tvParallaxProperties={undefined}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo"
        component={HomeScreen}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            setIsModalOpen(true);
          },
        })}
        options={{
          tabBarIcon: () => (
            <Icon
              name="plus-circle"
              type="font-awesome"
              color="white"
              tvParallaxProperties={undefined}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categorías"
        component={Categories}
        options={{
          tabBarIcon: () => (
            <Icon
              name="tags"
              type="font-awesome"
              color="white"
              tvParallaxProperties={undefined}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reportes"
        component={Reports}
        options={{
          tabBarIcon: () => (
            <Icon
              name="bar-chart"
              type="font-awesome"
              color="white"
              tvParallaxProperties={undefined}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
