import React from 'react';
import { View, Text } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ICategory } from '../../../types/categories';

import styles from './styles';

const CategoryItem: React.FC<ICategory> = props => {
  const { iconName, name } = props;

  return (
    <ListItem.Swipeable
      leftContent={
        <Button
          title="Info"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      }
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      }>
      <ListItem.Content>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon size={30} color={'#000'} name={iconName} />
          </View>
          <Text style={styles.title}>{name}</Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default CategoryItem;
