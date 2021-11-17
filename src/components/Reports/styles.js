import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '10%',
    color: 'black'
  },
  filersContainer: {
    display: 'flex'
  },
  extras_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  button: {
    width: 160,
    alignSelf: 'flex-end',
    marginRight: 30
  }
});
