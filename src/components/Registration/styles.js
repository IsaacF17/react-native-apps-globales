import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161d1d',
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    color: '#989C96',
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 40,
    width: 250,
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 25,
    marginBottom: 10,
    paddingLeft: 16,
    backgroundColor: '#E8EEF2',
  },
  button: {
    backgroundColor: '#415A77',
    marginTop: 30,
    height: 48,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#2e2e2d',
    marginTop: 15,
    color: '#989C96',
  },
  footerLink: {
    color: '#77B6EA',
    fontWeight: 'bold',
    fontSize: 14,
  },
  error: {
    color: 'red',
  },
});
