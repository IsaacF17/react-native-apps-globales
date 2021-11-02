import React from 'react';
import { View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import HomeChart from './Chart/HomeChart';
import Header from './Header/Header';

const list = [
  {
    name: 'Gasolina',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Gasto variable',
  },
  {
    name: 'Almuerzo',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Gasto variable',
  },
];

const HomeScreen = ({ navigation }: { navigation: any }) => (
  <View>
    <Header />
    <HomeChart />
    <View>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: l.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  </View>
);

export default HomeScreen;
