import { getGenericCollection } from '../utils/firebase';
import { IScheduledMovement } from '../types/movements';

const { collection, add, addAll, get, getAll, update, updateAll, remove } =
  getGenericCollection<IScheduledMovement>('scheduled');

export default { add, addAll, get, getAll, update, updateAll, remove };
