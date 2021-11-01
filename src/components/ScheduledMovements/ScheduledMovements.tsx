import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import GlobalContext from '../../contexts/GlobalContext';
import IconButton from '../common/Buttons/IconButton/IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-dynamic-search-bar';
import useToggleButtonGroup from '../../hooks/useToggleButtonGroup';

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
        <View style={{ flex: 8, backgroundColor: 'yellow' }}></View>
      </View>
    </SafeAreaView>
  );
};

export default ScheduledMovements;
