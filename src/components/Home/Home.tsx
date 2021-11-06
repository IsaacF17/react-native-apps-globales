import React from 'react';
import { View, ScrollView } from 'react-native';
import { SwipeableList } from '../SwipeableList/SwipeableList';
import HomeChart from './Chart/HomeChart';
import Header from './Header/Header';

const today = [
  {
    title: 'Spotify',
    icon_name: 'spotify',
    right_title: '₡ -11.000',
    subtitle: 'Gasto fijo',
    right_subtitle: '',
    left_content: {
      title: 'INFO',
      icon_name: 'info-circle',
    },
    right_content: {
      title: 'Quitar',
      icon_name: 'trash',
    },
  },
];

const week = [
  {
    name: 'Veterinario',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    value: '-35.000',
    type: 'G',
  },
  {
    name: 'PS5',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    value: '-500.000',
    type: 'G',
  },
  {
    name: 'Salario',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    value: '1.500.000',
    type: 'I',
  },
  {
    name: 'SIUU',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    value: '150.000',
    type: 'I',
  },
];

function test(arg: string) {
  console.log('TEST', arg);
}

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View style={{ flex: 1 }}>
    <Header />
    <HomeChart />
    <SwipeableList data={today} title="Hoy" />
    {/* <SwipeableList data={week} title="Semana"/> */}
  </View>
);

export default HomeScreen;
