import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  rowFront: {
    backgroundColor: '#0D1321',
    height: 65,
    width: Dimensions.get('window').width,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',
  },
  text_container: {
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: '#F0F6F6',
    textAlign: 'center',
    fontSize: 22,
    marginTop: 7,
  },
});
