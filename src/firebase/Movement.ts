import { getGenericCollection } from '../utils/firebase';
import { IMovement } from '../types/movements';
import { getThisWeekUnixRange } from '../utils/dates';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const { collection, add, addAll, get, getAll, update, updateAll, remove } =
  getGenericCollection<IMovement>('movements');

const getAllThisWeek = async (userId?: string): Promise<IMovement[] | null> => {
  try {
    const { mondayUnix, nextMondayUnix } = getThisWeekUnixRange();
    const query: FirebaseFirestoreTypes.Query<IMovement> = collection
      .where('date', '>=', mondayUnix)
      .where('date', '<', nextMondayUnix);
    if (userId?.length) {
      query.where('userId', '==', userId);
    }
    const response = await query.get();
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
