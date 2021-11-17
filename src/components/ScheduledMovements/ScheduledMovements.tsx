import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import GlobalContext from '../../contexts/GlobalContext';
import useToggleButtonGroup, {
  IUseToggleButtonGroupReturn,
} from '../../hooks/useToggleButtonGroup';
import IconButton from '../common/Buttons/IconButton/IconButton';
import { IScheduledMovement } from '../../types/movements';
import MovementItem from './MovementItem/MovementItem';
import { SwipeableList } from '../common/SwipeableList/SwipeableList';
import NewMovementContext from '../../contexts/NewMovementContext';

import styles from './styles';

const ScheduledMovements: React.FC = () => {
  const { scheduledMovements } = useContext(GlobalContext);
  const {
    setIsModalOpen,
    setInitialScheduleType,
    setEditingScheduledMovement,
    removeScheduledMovement,
  } = useContext(NewMovementContext);

  const [filteredList, setFilteredList] = useState<Array<IScheduledMovement>>(
    [],
  );
  const [currentSearch, setCurrentSearch] = useState<string>('');

  const [ToggleButtonGroup, selectedTypes]: IUseToggleButtonGroupReturn =
    useToggleButtonGroup({
      buttons: ['Ingresos', 'Gastos'],
      safeToggle: true,
      initialSelectedIndexes: [0, 1],
    });

  const openAddNewModal = () => {
    setInitialScheduleType('scheduled');
    setIsModalOpen(true);
  };

  useEffect(() => {
    let filteredList: Array<IScheduledMovement> = scheduledMovements;
    if (currentSearch.length > 2) {
      try {
        filteredList = filteredList.filter(movement =>
          movement.name.toLowerCase().includes(currentSearch.toLowerCase()),
        );
      } catch (ignore) {}
    }
    filteredList = filteredList.filter(movement =>
      selectedTypes.includes(movement.type === 'expense' ? 1 : 0),
    );
    setFilteredList(filteredList);
  }, [scheduledMovements, currentSearch, selectedTypes]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Ingresos/Gastos Automáticos</Text>
          <View style={styles.headerButtonContainer}>
            <IconButton
              name="plus"
              style={styles.headerAddButton}
              onPress={() => openAddNewModal()}
            />
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder="Escriba para buscar..."
            onChangeText={(newSearch: string) => {
              if (newSearch.length > 2) {
                setCurrentSearch(newSearch);
              } else if (currentSearch.length) {
                setCurrentSearch('');
              }
            }}
            onClearPress={() => {
              if (currentSearch.length) {
                setCurrentSearch('');
              }
            }}
          />
        </View>
        <View style={styles.filersContainer}>{ToggleButtonGroup}</View>
        <View style={styles.tableContainer}>
          <SwipeableList
            data={filteredList}
            childComponent={MovementItem}
            leftFunction={(data: IScheduledMovement) => {
              setEditingScheduledMovement(
                scheduledMovements.find(movement => movement.id === data.id) ??
                  null,
              );
              openAddNewModal();
            }}
            rightFunction={(data: IScheduledMovement) => {
              removeScheduledMovement(data.id);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScheduledMovements;
