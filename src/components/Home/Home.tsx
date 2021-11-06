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

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View style={{ flex: 1 }}>
    <Header />
    <HomeChart />
    <SwipeableList data={today} title="Hoy" />
    {/* <SwipeableList data={week} title="Semana"/> */}
  </View>
);

export default HomeScreen;
