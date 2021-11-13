import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import SearchBar from 'react-native-dynamic-search-bar';
import GlobalContext from '../../contexts/GlobalContext';
import IconButton from '../common/Buttons/IconButton/IconButton';

import styles from './styles';
import CategoryItem from './CategoryItem/CategoryItem';
import { ICategory } from '../../types/categories';
import { SwipeableList } from '../SwipeableList/SwipeableList';

export interface ICategories {}

const Categories: React.FC<ICategories> = props => {
  const globalContext = useContext(GlobalContext);

  const { testCategoryList, setTestCategoryList } = globalContext;

  const [categoryList, setCategoryList] = useState(testCategoryList);
  const [currentSearch, setCurrentSearch] = useState<string>('');

  const leftContent = {
    title: 'INFO',
    icon_name: 'info-circle',
  };

  const addNewHandler = (event: Event) => {
    console.log('TODO: open modal to create new category');
  };

  useEffect(() => {
    let filteredList: Array<ICategory> = testCategoryList;
    if (currentSearch.length > 2) {
      try {
        filteredList = testCategoryList.filter(movement =>
          movement.name.toLowerCase().includes(currentSearch.toLowerCase()),
        );
      } catch (ignore) {}
    }
    setCategoryList(filteredList);
  }, [currentSearch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Categorías</Text>
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
        <View style={styles.tableContainer}>
          <SwipeableList
            data={categoryList}
            childComponent={CategoryItem}
            disabledRightContent={true}
            leftContent={leftContent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Categories;
