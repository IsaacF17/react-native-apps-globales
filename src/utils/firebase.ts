import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export interface IGenericCollection<Type> {
  collection?: FirebaseFirestoreTypes.CollectionReference<Type>;
  add: (data: Type) => Promise<string | null>;
  get: (id: string) => Promise<Type | null>;
  getAll: () => Promise<Array<Type> | null>;
  update: (newData: Type & { id: string }) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
}

export const getGenericCollection = <Type>(
  name: string,
): IGenericCollection<Type> => {
  const collection = firestore().collection<Type>(name);

  const add = async (data: Type): Promise<string | null> => {
    try {
      const response = await collection.add(data);
      return response.id;
    } catch (error) {
      console.error(`Error while adding new doc to collection: ${name}`);
      console.error(`Error: ${error}`);
      return null;
    }
  };

  const get = async (id: string): Promise<Type | null> => {
    try {
      const response = await collection.doc(id).get();
      return response.data() ?? null;
    } catch (error) {
      console.error(`Error while fetching doc: ${id} from collection: ${name}`);
      console.error(`Error: ${error}`);
      return null;
    }
  };

  const getAll = async (): Promise<Array<Type> | null> => {
    try {
      const response = await collection.get();
      return response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error while fetching all docs from collection: ${name}`);
      console.error(`Error: ${error}`);
      return null;
    }
  };

  const update = async (newData: Type & { id: string }): Promise<boolean> => {
    try {
      await collection.doc(newData.id).update(newData);
      return true;
    } catch (error) {
      console.error(
        `Error while updating doc: ${newData.id} in collection: ${name}`,
      );
      console.error(`Error: ${error}`);
      return false;
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      await collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error(`Error while deleting doc: ${id} from collection: ${name}`);
      console.error(`Error: ${error}`);
      return false;
    }
  };

  return {
    collection,
    add,
    get,
    getAll,
    update,
    remove,
  };
};
