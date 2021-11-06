import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface usuario {
  name: string;
  email: string;
  pass: string;
}

const usuariosRef = firestore().collection('usuarios');

export const add = async (data: any) => {
  const exist = await checkIfEmailExists(data?.email);
  if (exist) return;
  else {
    return usuariosRef
      ?.add(data)
      .then(data => data.id)
      .catch(error => {
        console.log(error);
      });
  }
};

export const checkUserData = (email: string, passw: string) => {
  return usuariosRef
    .where('email', '==', email)
    .where('pass', '==', passw)
    .get()
    .then(snapShot => {
      if (snapShot.empty) return;
      return snapShot.docs[0].data();
    });
};

const checkIfEmailExists = async (email: string) => {
  return usuariosRef
    .where('email', '==', email)
    .get()
    .then(snapShot => !snapShot.empty);
};
