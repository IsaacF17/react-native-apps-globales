import firestore, {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

/**
 * Las funciones que tienen el userId como parámetro opcional son las que pueden
 * llegar a necesitar "autenticación", simplemente si se les pasa el parámetro
 * se agrega el where(userId == ...)
 */
export interface IGenericCollection<Type> {
  collection: FirebaseFirestoreTypes.CollectionReference<Type>;
  add: (data: Type) => Promise<string | null>;
  addAll: (dataList: Array<Type>) => Promise<boolean>;
  get: (id: string, userId?: string) => Promise<Type | null>;
  getAll: (userId?: string) => Promise<Array<Type> | null>;
  update: (newData: Type & { id: string }, userId?: string) => Promise<boolean>;
  updateAll: (
    newDataList: Array<Type & { id: string }>,
    userId?: string,
  ) => Promise<boolean>;
  remove: (id: string, userId?: string) => Promise<boolean>;
}

export const getGenericCollection = <Type>(
  name: string,
): IGenericCollection<Type> => {
  const collection = firestore().collection<Type>(name);

  const whereIdEqualsTo = (
    id: string,
    query?: FirebaseFirestoreTypes.Query<Type>,
  ): FirebaseFirestoreTypes.Query<Type> =>
    (query ?? collection).where(
      firebase.firestore.FieldPath.documentId(),
      '==',
      id,
    );

  const whereUserIdEqualsTo = (
    userId: string,
    query?: FirebaseFirestoreTypes.Query<Type>,
  ): FirebaseFirestoreTypes.Query<Type> =>
    (query ?? collection).where('userId' as keyof Type, '==', userId);

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

  const addAll = async (dataList: Array<Type>): Promise<boolean> => {
    if (dataList.length) {
      try {
        const batch = firebase.firestore().batch();
        dataList.forEach((data: Type) => {
          const docRef = collection.doc();
          batch.set(docRef, data);
        });
        await batch.commit();
        return true;
      } catch (error) {
        console.error(
          `Error while adding list of new doc to collection: ${name}`,
        );
        console.error(`Error: ${error}`);
        return false;
      }
    } else {
      return true;
    }
  };

  const get = async (id: string, userId?: string): Promise<Type | null> => {
    try {
      let query = whereIdEqualsTo(id);
      if (userId?.length) {
        query = whereUserIdEqualsTo(userId, query);
      }
      const response = await query.get();
      if (response.size === 1) {
        const doc = response?.docs?.[0];
        return doc?.id ? { ...doc.data(), id: doc.id } : null;
      } else {
        throw new Error(`Document does not exist or User is not the owner`);
      }
    } catch (error) {
      console.error(`Error while fetching doc: ${id} from collection: ${name}`);
      console.error(`Error: ${error}`);
      return null;
    }
  };

  const getAll = async (userId?: string): Promise<Array<Type> | null> => {
    try {
      let response: FirebaseFirestoreTypes.QuerySnapshot<Type> | null = null;
      if (userId?.length) {
        response = await whereUserIdEqualsTo(userId).get();
      } else {
        response = await collection.get();
      }
      return response.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error(`Error while fetching all docs from collection: ${name}`);
      console.error(`Error: ${error}`);
      return null;
    }
  };

  const update = async (
    newData: Type & { id: string },
    userId?: string,
  ): Promise<boolean> => {
    const document = await get(newData.id, userId);
    try {
      if (document) {
        await collection.doc(newData.id).update(newData);
        return true;
      } else {
        throw new Error(`Document does not exist`);
      }
    } catch (error) {
      console.error(
        `Error while updating doc: ${newData.id} in collection: ${name}`,
      );
      console.error(`Error: ${error}`);
      return false;
    }
  };

  const updateAll = async (
    newDataList: Array<Type & { id: string }>,
    userId?: string,
  ): Promise<boolean> => {
    if (newDataList.length) {
      try {
        const batch = firebase.firestore().batch();
        newDataList.forEach((data: Type & { id: string }) => {
          const docRef = collection.doc(data.id);
          // TODO: if userId then check if current user is owner
          batch.update(docRef, data);
        });
        await batch.commit();
        return true;
      } catch (error) {
        console.error(
          `Error while adding list of new doc to collection: ${name}`,
        );
        console.error(`Error: ${error}`);
        return false;
      }
    } else {
      return true;
    }
  };

  const remove = async (id: string, userId?: string): Promise<boolean> => {
    const document = await get(id, userId);
    try {
      if (document) {
        await collection.doc(id).delete();
      }
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
    addAll,
    get,
    getAll,
    update,
    updateAll,
    remove,
  };
};
