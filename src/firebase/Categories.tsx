import firestore from '@react-native-firebase/firestore';

interface category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

const users = firestore().collection('users');
const categoriesRef = firestore().collection('categories');

export const addUserCategory = async (data: any, userID: string) => {
  return users
    .doc(userID)
    .collection('userCategories')
    ?.add(data)
    .then(data => data.id)
    .catch(error => {
      console.log('ERRORRR', error);
    });
};

export const updateCategory = async (
  data: any,
  categoryID: string,
  userID: string,
) => {
  return await users
    .doc(userID)
    .collection('userCategories')
    .doc(categoryID)
    .set(data);
};

export const deleteCategory = async (userID: string, categoryID: string) => {
  return await users
    .doc(userID)
    .collection('userCategories')
    .doc(categoryID)
    .delete()
    .then(res => true)
    .catch(res => false);
};

export const getCategories = async (userID: string) => {
  const data: any[] = [];
  const userCategoriesData = await users
    .doc(userID)
    .collection('userCategories')
    .get();

  if (!userCategoriesData.empty) {
    userCategoriesData.docs.forEach(doc => {
      const newObj = { ...doc.data(), id: doc.id, fromUser: true };
      data.push(newObj);
    });
  }
  (await categoriesRef.get()).docs.forEach(doc => {
    const newObj = { ...doc.data(), id: doc.id, notSwipeable: true };
    data.push(newObj);
  });
  return data;
};
