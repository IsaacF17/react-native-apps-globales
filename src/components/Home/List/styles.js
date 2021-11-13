import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default StyleSheet.create({
  rowFront: {
    backgroundColor: '#0D1321',
    height: 65,
    width: Dimensions.get('window').width,
    marginBottom: 5,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  tex: {
    color: '#F0F6F6',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 7,
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 12,
  },
  right_title: {
    marginLeft: 170,
    fontSize: 18,
    marginTop: 10,
    color: '#C50A07',
  },
  right_subtitle: {
    marginLeft: 175,
    textAlign: 'left',
  },
  hide_content_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left_content: {
    backgroundColor: '#008FF5',
    height: 64,
    width: 75,
    marginLeft: 7,
    borderRadius: 5,
  },
  left_content_title: {
    color: 'white',
    textAlign: 'center',
  },
  right_content: {
    backgroundColor: '#DA3E52',
    height: 65,
    width: 75,
    marginLeft: -82,
    borderRadius: 10,
  },
  right_content_title: {
    color: 'white',
    textAlign: 'center',
  },
});
