import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { IScheduledMovement } from '../../../../types/movements';

import styles from './styles';

export interface IModalItem {
  item: IScheduledMovement;
  setIsSelected: (itemId: string, isChecked: boolean) => void;
}

const ModalItem: React.FC<IModalItem> = props => {
  const { item, setIsSelected } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(item.id, isChecked);
  }, [isChecked]);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => setIsChecked(prevState => !prevState)}>
      <View style={styles.mainContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <BouncyCheckbox
          isChecked={isChecked}
          disableBuiltInState
          fillColor="#27a02b"
          iconStyle={{ borderColor: '#27a02b' }}
          onPress={() => setIsChecked(prevState => !prevState)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ModalItem;
