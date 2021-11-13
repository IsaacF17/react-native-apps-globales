import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import SearchBar from 'react-native-dynamic-search-bar';
import Modal from 'react-native-modal';
import IconButton from '../common/Buttons/IconButton/IconButton';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import CategoryItem from './CategoryItem/CategoryItem';
import { ICategory } from '../../types/categories';
import GlobalContext from '../../contexts/GlobalContext';

import styles from './styles';

export interface ICategories {}

const Categories: React.FC<ICategories> = props => {
  const globalContext = useContext(GlobalContext);

  const { testCategoryList, setTestCategoryList } = globalContext;

  const [categoryList, setCategoryList] = useState(testCategoryList);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [isAddNewOverlayOpen, setIsAddNewOverlayOpen] = useState(false);

  const onSubmitNewCategory = async (data: any) => {
    console.log('TODO: Save new category', `Data: ${JSON.stringify(data)}`);
    setIsAddNewOverlayOpen(false);
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
        <View style={styles.tableContainer}>
          <ScrollView style={styles.tableScrollView}>
            {categoryList.map((category, index) => (
              <CategoryItem
                key={`category-${index}`}
                iconName={category.iconName}
                name={category.name}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Modal
        style={styles.addNewCategoryModal}
        isVisible={isAddNewOverlayOpen}
        animationIn="slideInDown"
        animationOut="slideOutDown"
        backdropOpacity={0}
        onBackdropPress={() => setIsAddNewOverlayOpen(false)}>
        <AddNewCategory onSubmit={onSubmitNewCategory} />
      </Modal>
    </SafeAreaView>
  );
};

export default Categories;
