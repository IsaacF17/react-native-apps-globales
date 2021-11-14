import React from 'react';
import { View, Text } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { IScheduledMovement } from '../../../types/movements';

import styles from './styles';

export interface IMovementItem {
  handleRemoveAction?: (id: string) => void;
  handleEditAction?: (id: string) => void;
}

const MovementItem: React.FC<IScheduledMovement & IMovementItem> = props => {
  const {
    id,
    type,
    name,
    value,
    nextDate,
    handleRemoveAction,
    handleEditAction,
  } = props;

  return (
    <ListItem.Swipeable
      leftContent={
        <Button
          title="Info"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
          onPress={() => {
            if (id) {
              handleEditAction?.(id);
            }
          }}
        />
      }
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          onPress={() => {
            if (id) {
              handleRemoveAction?.(id);
            }
          }}
        />
      }>
      <ListItem.Content>
        <View style={styles.content}>
          <Text style={styles.contentCell}>{name}</Text>
          <Text style={styles.contentCell}>{`${
            type === 'expense' ? '-' : ''
          } ₡${value}`}</Text>
          <Text style={styles.contentCell}>{nextDate}</Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default MovementItem;
