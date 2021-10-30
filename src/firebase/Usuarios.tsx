import firestore from '@react-native-firebase/firestore';

interface usuario {
  name: string;
  email: string;
  pass: string;
}

const usuariosRef = firestore().collection('usuarios');

export const add = (data: any) => {
  return usuariosRef
    ?.add(data)
    .then(data => data.id)
    .catch(error => {
      console.log(error);
    });
};
