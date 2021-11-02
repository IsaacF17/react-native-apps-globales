import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import GlobalContext from '../../contexts/GlobalContext';
import IconButton from '../common/Buttons/IconButton/IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import useToggleButtonGroup from '../../hooks/useToggleButtonGroup';
import MovementItem from './MovementItem/MovementItem';

export interface IScheduledMovements {}

const ScheduledMovements: React.FC<IScheduledMovements> = props => {
  const globalContext = useContext(GlobalContext);

  const [currentSearch, setCurrentSearch] = useState<string>('');

  const [ToggleButtonGroup, selectedTypes] = useToggleButtonGroup({
    buttons: ['Ingresos', 'Gastos'],
    safeToggle: true,
    initialSelectedIndexes: [0],
  });

  const addNewHandler = (event: any) => {
    console.log(
      'TODO: Opening modal to add a new... whatever tf those are called lol',
    );
  };

  useEffect(() => {
    console.log(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    console.log(selectedTypes);
  }, [selectedTypes]);

  const testData = [
    { name: 'Netflix', value: '-₡8000', nextDate: '01/10/21' },
    { name: 'Salario', value: '₡745000', nextDate: '01/10/21' },
    { name: 'Gym', value: '-₡18000', nextDate: '01/10/21' },
    { name: 'Netflix', value: '-₡8000', nextDate: '01/10/21' },
    { name: 'Salario', value: '₡745000', nextDate: '01/10/21' },
    { name: 'Gym', value: '-₡18000', nextDate: '01/10/21' },
    { name: 'Netflix', value: '-₡8000', nextDate: '01/10/21' },
    { name: 'Salario', value: '₡745000', nextDate: '01/10/21' },
    { name: 'Gym', value: '-₡18000', nextDate: '01/10/21' },
    { name: 'Netflix', value: '-₡8000', nextDate: '01/10/21' },
    { name: 'Salario', value: '₡745000', nextDate: '01/10/21' },
    { name: 'Gym', value: '-₡18000', nextDate: '01/10/21' },
    { name: 'Netflix', value: '-₡8000', nextDate: '01/10/21' },
    { name: 'Salario', value: '₡745000', nextDate: '01/10/21' },
    { name: 'Gym', value: '-₡18000', nextDate: '01/10/21' },
  ];

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
            placeholder="Type Here..."
            onChangeText={(newSearch: string) => {
              setCurrentSearch(newSearch);
            }}
          />
        </View>
        <View style={styles.filersContainer}>
          {/* @ts-ignore */}
          <ToggleButtonGroup />
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeadings}>Nombre</Text>
            <Text style={styles.tableHeadings}>Monto</Text>
            <Text style={styles.tableHeadings}>Próximo</Text>
          </View>
          <ScrollView style={styles.tableScrollView}>
            {testData.map((item, index) => (
              <MovementItem
                key={`scheduled-movement-${index}`}
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
