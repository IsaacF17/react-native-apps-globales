import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native-ui-lib';
import SearchBar from 'react-native-dynamic-search-bar';
import Modal from 'react-native-modal';
import IconButton from '../common/Buttons/IconButton/IconButton';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import CategoryItem from './CategoryItem/CategoryItem';
import { ICategory } from '../../types/categories';
import GlobalContext from '../../contexts/GlobalContext';
import { SwipeableList } from '../common/SwipeableList/SwipeableList';

import styles from './styles';
import {
  addUserCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../../firebase/Categories';

export interface ICategories {}

const Categories: React.FC<ICategories> = props => {
  const globalContext = useContext(GlobalContext);

  const { categoriesList, user, setCategoriesList } = globalContext;

  const [copyCategoriesList, setCopyCategoriesList] = useState(categoriesList);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [isAddNewOverlayOpen, setIsAddNewOverlayOpen] = useState(false);
  const [category, setCategory] = useState({});

  const onSubmitNewCategory = async (data: any, categoryID?: string) => {
    if (categoryID) {
      updateCategory(data, categoryID, user.id);
    } else {
      addUserCategory(data, user.id);
    }
    const newCategoriesList = await getCategories(user.id);
    setCategoriesList(newCategoriesList);
    setCopyCategoriesList(newCategoriesList);
    setIsAddNewOverlayOpen(false);
  };

  const leftContent = {
    title: 'INFO',
    icon_name: 'info-circle',
  };

  const rightContent = {
    title: 'Borrar',
    icon_name: 'trash',
  };

  const toggleModal = (data?: any) => {
    setCategory(data);
    setIsAddNewOverlayOpen(true);
  };

  const removeCategory = async (data?: any) => {
    const res = await deleteCategory(user.id, data.id);
    if (res) {
      const newCategoriesList = await getCategories(user.id);
      console.log(newCategoriesList);

      setCategoriesList(newCategoriesList);
      setCopyCategoriesList(newCategoriesList);
    }
  };

  useEffect(() => {
    let filteredList: Array<ICategory> = copyCategoriesList;
    if (currentSearch.length > 2) {
      try {
        filteredList = categoriesList.filter(movement =>
          movement.name.toLowerCase().includes(currentSearch.toLowerCase()),
        );
      } catch (ignore) {}
      setCopyCategoriesList(filteredList);
    } else setCopyCategoriesList(categoriesList);
  }, [currentSearch]);

  return (
    <View style={{ flex: 1, backgroundColor: '#161d1d' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Categor??as</Text>
            <View style={styles.headerButtonContainer}>
              <IconButton
                name="plus"
                style={styles.headerAddButton}
                onPress={() => {
                  setCategory({});
                  setIsAddNewOverlayOpen(true);
                }}
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
              data={copyCategoriesList}
              childComponent={CategoryItem}
              leftContent={leftContent}
              rightContent={rightContent}
              leftFunction={toggleModal}
              rightFunction={removeCategory}
            />
          </View>
        </View>
        <Modal
          style={styles.addNewCategoryModal}
          isVisible={isAddNewOverlayOpen}
          animationIn="slideInDown"
          animationOut="slideOutDown"
          backdropOpacity={0}
          onBackdropPress={() => setIsAddNewOverlayOpen(false)}>
          <AddNewCategory onSubmit={onSubmitNewCategory} data={category} />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Categories;
