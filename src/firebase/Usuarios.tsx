import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface usuario {
  name: string;
  email: string;
  pass: string;
}

const usuariosRef = firestore().collection('usuarios');

export async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  console.log('SIUUUU', googleCredential);

  return auth().signInWithCredential(googleCredential);
}

export const add = (data: any) => {
  return usuariosRef
    ?.add(data)
    .then(data => data.id)
    .catch(error => {
      console.log(error);
    });
};
