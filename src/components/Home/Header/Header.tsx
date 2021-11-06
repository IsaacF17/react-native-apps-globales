import React from 'react';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import styles from './styles';

const Header = () => (
  <View>
    <View style={styles.header}>
      <Text h3>Hola, Spiderman</Text>
      <Avatar
        size="medium"
        rounded
        source={{
          uri: 'https://www.quever.news/u/fotografias/m/2021/9/27/f608x342-16235_45958_0.jpg',
        }}
      />
    </View>
  </View>
);

export default Header;
