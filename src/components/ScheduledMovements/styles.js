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
  },
  filersContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: '30%',
  },
});
