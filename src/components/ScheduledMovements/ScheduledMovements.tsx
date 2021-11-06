import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import GlobalContext from '../../contexts/GlobalContext';
import IconButton from '../common/Buttons/IconButton/IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import useToggleButtonGroup, {
  IUseToggleButtonGroupReturn,
} from '../../hooks/useToggleButtonGroup';
import MovementItem from './MovementItem/MovementItem';
import { IMovement } from '../../types/movements';
import { toNumber } from 'lodash';

import styles from './styles';

export interface IScheduledMovements {}

const ScheduledMovements: React.FC<IScheduledMovements> = props => {
  const globalContext = useContext(GlobalContext);

  const { testMovementsData, setTestMovementsData } = globalContext;

  const [movementList, setMovementList] = useState<Array<IMovement>>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');

  const [ToggleButtonGroup, selectedTypes]: IUseToggleButtonGroupReturn =
    useToggleButtonGroup({
      buttons: ['Ingresos', 'Gastos'],
      safeToggle: true,
      initialSelectedIndexes: [0, 1],
    });

  const addNewHandler = (event: Event) => {
    console.log('TODO: open modal to create new income/expense');
  };

  useEffect(() => {
    let filteredList: Array<IMovement> = testMovementsData;
    if (currentSearch.length > 2) {
      try {
        filteredList = testMovementsData.filter(movement =>
          movement.name.toLowerCase().includes(currentSearch.toLowerCase()),
        );
      } catch (ignore) {}
    }
    filteredList = filteredList.filter(movement =>
      selectedTypes.includes(toNumber(movement.type === 'expense')),
    );
    setMovementList(filteredList);
  }, [currentSearch, selectedTypes]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Ingresos/Gastos Automáticos</Text>
          <View style={styles.headerButtonContainer}>
            <IconButton
              name="plus"
              style={styles.headerAddButton}
              onPress={addNewHandler}
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
          {/* <View style={styles.tableHeader}>
            <Text style={styles.tableHeadings}>Nombre</Text>
            <Text style={styles.tableHeadings}>Monto</Text>
            <Text style={styles.tableHeadings}>Próximo</Text>
          </View> */}
          <ScrollView style={styles.tableScrollView}>
            {movementList.map((item, index) => (
              <MovementItem
                key={`scheduled-movement-${index}`}
                type={item.type}
                name={item.name}
                value={item.value}
                nextDate={item.nextDate}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScheduledMovements;
