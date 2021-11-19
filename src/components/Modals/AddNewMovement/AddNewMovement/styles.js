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
    backgroundColor: '#2c2a4a',
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
  category_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  dataContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerData: {
    fontSize: 16,
    color: 'white',
  },
  formContainer: {
    marginVertical: 20,
  },
  formInputNameContainer: {
    width: '100%',
  },
  formInputPerioToggleContainer: {
    flex: 4,
  },
  formInputPeriodicityContainer: {
    flex: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  formInputDetailsContainer: {
    width: '100%',
    marginTop: 10,
  },
  formMultiInputContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  formInputTypeContainer: {
    flex: 4,
  },
  formInputValueContainer: {
    flex: 6,
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
  formInputPeriodicity: {
    height: textInputHeight,
  },
  formInputPeriodicityDisabled: {
    color: 'white',
  },
  formInputType: {
    height: textInputHeight,
  },
  formInputValue: {
    height: textInputHeight,
  },
  formErrorMessage: {
    paddingLeft: 5,
    color: 'red',
  },
  buttonsContainer: {
    // width: '90%',
  },
  toggleButton: {
    height: textInputHeight,
  },
  saveButton: {
    height: textInputHeight,
    backgroundColor: '#27a02a',
    paddingVertical: 5,
    width: '100%',
  },
});
