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
  contentCell: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#F0F6F6',
    fontSize: 18,
  },
});
