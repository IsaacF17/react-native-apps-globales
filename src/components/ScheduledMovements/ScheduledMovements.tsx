import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import GlobalContext from '../../contexts/GlobalContext';
import useToggleButtonGroup, {
  IUseToggleButtonGroupReturn,
} from '../../hooks/useToggleButtonGroup';
import IconButton from '../common/Buttons/IconButton/IconButton';
import { IMovement, IScheduledMovement } from '../../types/movements';
import MovementItem from './MovementItem/MovementItem';
import AddNewMovement from '../AddNewMovement/AddNewMovement';
import movementService from '../../firebase/Movement';
import scheduledService from '../../firebase/Scheduled';

import styles from './styles';

export interface IScheduledMovements {}

const ScheduledMovements: React.FC<IScheduledMovements> = props => {
  const { scheduledMovements, setScheduledMovements, user } =
    useContext(GlobalContext);

  const [filteredList, setFilteredList] = useState<Array<IScheduledMovement>>(
    [],
  );
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [isAddNewOverlayOpen, setIsAddNewOverlayOpen] =
    useState<boolean>(false);
  const [updatingTarget, setUpdatingTarget] = useState<
    IScheduledMovement | null | undefined
  >(null);

  const [ToggleButtonGroup, selectedTypes]: IUseToggleButtonGroupReturn =
    useToggleButtonGroup({
      buttons: ['Ingresos', 'Gastos'],
      safeToggle: true,
      initialSelectedIndexes: [0, 1],
    });

  const submitNewSingleMovement = async (data: IMovement) => {
    data.userId = user.id;
    movementService.add(data).then(newId => {
      const newData = { ...data, id: newId };
    });
    setIsAddNewOverlayOpen(false);
  };

  const submitNewScheduledMovement = async (data: IScheduledMovement) => {
    data.userId = user.id;
    scheduledService.add(data).then(newId => {
      if (newId) {
        setScheduledMovements(prevState => [
          { ...data, id: newId },
          ...prevState,
        ]);
      }
    });
    setIsAddNewOverlayOpen(false);
  };

  const updateScheduledMovement = async (newData: IScheduledMovement) => {
    newData.userId = user.id;
    const response = await scheduledService.update(newData, user.id);
    if (response) {
      setScheduledMovements(prevState =>
        prevState.map(movement =>
          movement.id === newData.id ? newData : movement,
        ),
      );
    }
    setIsAddNewOverlayOpen(false);
  };

  const removeScheduledMovement = async (id: string) => {
    const response = await scheduledService.remove(id, user.id);
    if (response) {
      setScheduledMovements(prevState =>
        prevState.filter(movement => movement.id !== id),
      );
    }
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
              onPress={() => setIsAddNewOverlayOpen(true)}
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
          <ScrollView style={styles.tableScrollView}>
            {filteredList.map((item, index) => (
              <MovementItem
                key={`scheduled-movement-${index}`}
                {...item}
                handleRemoveAction={removeScheduledMovement}
                handleEditAction={(id: string) => {
                  setUpdatingTarget(
                    scheduledMovements.find(movement => movement.id === id),
                  );
                  setIsAddNewOverlayOpen(true);
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Modal
        style={styles.addNewMovementModal}
        isVisible={isAddNewOverlayOpen}
        animationIn="slideInDown"
        animationOut="slideOutDown"
        backdropOpacity={0}
        onBackdropPress={() => setIsAddNewOverlayOpen(false)}
        onModalHide={() => setUpdatingTarget(null)}>
        <AddNewMovement
          scheduledMovement={updatingTarget}
          initialScheduleType="scheduled"
          submitNewSingleMovement={submitNewSingleMovement}
          submitNewScheduledMovement={submitNewScheduledMovement}
          updateScheduledMovement={updateScheduledMovement}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduledMovements;
