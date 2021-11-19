import { getGenericCollection } from '../utils/firebase';
import { IMovement } from '../types/movements';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getThisWeekUnixRange } from '../utils/unix';
import firestore from '@react-native-firebase/firestore';

const { collection, add, addAll, get, getAll, update, updateAll, remove } =
  getGenericCollection<IMovement>('movements');

const ref = firestore().collection('movements');

const getAllThisWeek = async (userId: string): Promise<any> => {
  try {
    const { thisMonday, nextMonday } = getThisWeekUnixRange();
    const response = await ref
      .where('date', '>=', thisMonday)
      .where('date', '<', nextMonday)
      .where('userId', '==', userId)
      .get();
    return response.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(`Error while fetching this week movements`);
    console.error(`Error: ${error}`);
    return null;
  }
};

export default {
  add,
  addAll,
  get,
  getAll,
  getAllThisWeek,
  update,
  updateAll,
  remove,
};
