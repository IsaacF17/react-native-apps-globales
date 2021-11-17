import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default StyleSheet.create({
  rowFront: {
    backgroundColor: '#0D1321',
    height: 65,
    width: Dimensions.get('window').width,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 5,
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 3,
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avatar: {},
  text: {
    color: '#F0F6F6',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 12,
  },
  value: {
    fontSize: 20,
  },
});
