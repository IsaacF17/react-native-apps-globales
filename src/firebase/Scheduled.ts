import { getGenericCollection } from '../utils/firebase';
import { IScheduledMovement } from '../types/movements';

const { collection, add, get, getAll, update, remove } =
  getGenericCollection<IScheduledMovement>('scheduled');

export default { add, get, getAll, update, remove };
