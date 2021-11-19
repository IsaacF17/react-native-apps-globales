import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default StyleSheet.create({
  hide_content_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left_content: {
    backgroundColor: '#008FF5',
    paddingTop: 6,
    height: 64,
    width: 75,
    borderRadius: 5,
  },
  left_content_title: {
    color: 'white',
    textAlign: 'center',
  },
  right_content: {
    backgroundColor: '#DA3E52',
    paddingTop: 5,
    height: 64,
    width: 75,
    borderRadius: 10,
  },
  right_content_title: {
    color: 'white',
    textAlign: 'center',
  },
});
