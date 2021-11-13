import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  rowFront: {
    backgroundColor: '#0D1321',
    height: 65,
    width: Dimensions.get('window').width,
    marginBottom: 3,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
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
