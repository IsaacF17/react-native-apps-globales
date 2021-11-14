import { getGenericCollection } from '../utils/firebase';
import { IMovement } from '../types/movements';

const { collection, add, get, getAll, update, remove } =
  getGenericCollection<IMovement>('movements');

export default { add, get, getAll, update, remove };
