import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ICategory } from '../../../types/categories';

import styles from './styles';

const CategoryItem: React.FC<any> = props => {
  const { icon_name, name } = props.data;
  return (
    <>
      <View style={styles.rowFront}>
        <Avatar
          rounded
          icon={{
            name: icon_name,
            type: 'font-awesome',
            color: '#8CBCB9',
          }}
          iconStyle={{ marginTop: -2 }}
          size={70}
        />
        <View style={styles.text_container}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    </>
  );
};

export default CategoryItem;
