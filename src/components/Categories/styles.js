import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  headerTitle: {
    flex: 4,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAddButton: {
    height: 50,
    width: 50,
  },
  searchBarContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  tableContainer: {
    flex: 8,
  },
  tableScrollView: {
    flex: 1,
    flexShrink: 1,
  },
  addNewCategoryModal: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
