import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { IScheduledMovement } from '../../../types/movements';
import ModalItem from './ModalItem/ModalItem';
import { Button } from 'react-native-ui-lib';

import styles from './styles';

export interface IModal {
  expiredMovements: Array<IScheduledMovement>;
  handleSavePendingMovements: (selectedIds: { [key: string]: boolean }) => void;
}

const Modal: React.FC<IModal> = props => {
  const { expiredMovements, handleSavePendingMovements } = props;

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <View style={styles.modalContent}>
      <Text style={{ color: '#e5ebec', fontSize: 15 }}>
        Tienes movimientos pendientes:
      </Text>
      <View style={styles.modalListContainer}>
        <FlatList
          data={expiredMovements}
          renderItem={({ item, index }) => (
            <ModalItem
              key={index}
              item={item}
              setIsSelected={(itemId: string, isChecked: boolean) => {
                setSelectedItems(prevState => ({
                  ...prevState,
                  [itemId]: isChecked,
                }));
              }}
            />
          )}
          keyExtractor={mov => mov.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.saveButton}
          label="Guardar"
          onPress={() => {
            handleSavePendingMovements(selectedItems);
          }}
        />
      </View>
    </View>
  );
};

export default Modal;
