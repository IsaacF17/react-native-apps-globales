import React from 'react';
import { View, Text } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { IMovement } from '../../../types/movements';

import styles from './styles';

const MovementItem: React.FC<IMovement> = props => {
  const { type, name, value, nextDate } = props;

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
          <Text style={styles.contentCell}>{name}</Text>
          <Text style={styles.contentCell}>{`${
            type ? '-' : ''
          }₡${value}`}</Text>
          <Text style={styles.contentCell}>{nextDate}</Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default MovementItem;
