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
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#e5ebec',
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
    marginTop: 10,
  },
  filersContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tableContainer: {
    flex: 7,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  tableHeadings: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    paddingVertical: 10,
    color: '#e5ebec',
  },
  tableScrollView: {
    flex: 1,
    flexShrink: 1,
  },
});
