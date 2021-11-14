import firestore from '@react-native-firebase/firestore';

interface usuario {
  name: string;
  email: string;
  pass: string;
}

const usuariosRef = firestore().collection('users');

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
      return { ...snapShot.docs[0].data(), user_id: snapShot.docs[0].id };
    });
};

const checkIfEmailExists = async (email: string) => {
  return usuariosRef
    .where('email', '==', email)
    .get()
    .then(snapShot => !snapShot.empty);
};
