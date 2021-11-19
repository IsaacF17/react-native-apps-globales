import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { IMovement } from '../../../types/movements';
import { formatShortDate } from '../../../utils/dates';

import styles from './styles';

export const List: React.FC<{ data: IMovement }> = props => {
  const { date, name, type, value, iconCategoryName } = props.data;

  return (
    <>
      <View style={styles.rowFront}>
        <View style={styles.leftContainer}>
          <Avatar
            rounded
            icon={{
              name: iconCategoryName || 'tags',
              type: 'font-awesome',
              color: '#6dbdb8',
            }}
            iconStyle={styles.avatar}
            size={70}
          />
        </View>
        <View style={styles.middleContainer}>
          <Text style={[styles.text, styles.title]}>{name}</Text>
          <Text style={[styles.text, styles.subtitle]}>
            {formatShortDate(new Date(date))}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[
              styles.text,
              styles.value,
              { color: type === 'expense' ? '#ff3030' : '#30ff72' },
            ]}>
            {`${type === 'expense' ? '- ' : '  '}₡${value}`}
          </Text>
        </View>
      </View>
    </>
  );
};
