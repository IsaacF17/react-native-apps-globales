import React from 'react';
import { View, Text } from 'react-native';
import { IScheduledMovement } from '../../../types/movements';

import styles from './styles';

export interface IMovementItem {
  data: IScheduledMovement;
}

const MovementItem: React.FC<IMovementItem> = props => {
  const { type, name, value, nextDate } = props.data;

  return (
    <View style={styles.rowFront}>
      <Text style={styles.contentCell}>{name}</Text>
      <Text style={styles.contentCell}>{`${
        type === 'expense' ? '-' : ''
      } ₡${value}`}</Text>
      <Text style={styles.contentCell}>{nextDate}</Text>
    </View>
  );
};

export default MovementItem;
