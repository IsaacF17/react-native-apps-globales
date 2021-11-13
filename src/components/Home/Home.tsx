import React from 'react';
import { View } from 'react-native';
import { SwipeableList } from '../SwipeableList/SwipeableList';
import HomeChart from './Chart/HomeChart';
import Header from './Header/Header';
import { List } from './List/List';

const today = [
  {
    id: 1,
    title: 'Spotify',
    icon_name: 'spotify',
    right_title: '₡ -11.000',
    subtitle: 'Gasto fijo',
    right_subtitle: '',
  },
];

const left_content = {
  title: 'INFO',
  icon_name: 'info-circle',
};

const right_content = {
  title: 'Quitar',
  icon_name: 'trash',
};

const test = (item?: any) => {
  console.log('Test completed, ID: ', item.id);
};

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View style={{ flex: 1 }}>
    <Header />
    <HomeChart />
    <SwipeableList
      data={today}
      childComponent={List}
      rightContent={right_content}
      leftContent={left_content}
      leftFunction={test}
    />
  </View>
);

export default HomeScreen;
