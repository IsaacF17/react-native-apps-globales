import { StyleSheet } from 'react-native';

const textInputHeight = 40;

export default StyleSheet.create({
  mainContainer: {
    width: '80%',
    borderRadius: 15,
  },
  modalView: {
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: '#2A4D4E',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  defaultContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
  },
  iconButtons: {
    height: 'auto',
    width: 'auto',
    backgroundColor: 'transparent',
    margin: 10,
  },
  formContainer: {
    marginVertical: 20,
  },
  formInputNameContainer: {
    width: '100%',
  },
  formInputDetailsContainer: {
    width: '100%',
    marginTop: 10,
  },
  formTextInput: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  formInputName: {
    height: textInputHeight,
  },
  formInputDetails: {
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
  },
  formErrorMessage: {
    paddingLeft: 5,
    color: 'red',
  },
  toggleButton: {
    height: textInputHeight,
  },
  buttonsContainer: {
    // width: '90%',
  },
  saveButton: {
    height: textInputHeight,
    backgroundColor: '#27a02a',
    paddingVertical: 5,
    width: '100%',
  },
});
