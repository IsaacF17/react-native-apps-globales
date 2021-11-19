import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  modalContent: {
    width: '75%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    maxHeight: Dimensions.get('window').height * 0.75,
    backgroundColor: '#2A4D4E',
  },
  modalListContainer: {
    marginTop: 10,
    maxHeight: '86%',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#27a02a',
    paddingVertical: 5,
  },
});
