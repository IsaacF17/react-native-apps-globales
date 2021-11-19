import firestore from '@react-native-firebase/firestore';

const movementsRef = firestore().collection('movements');

export const getReportData = async (fromDate: number, toDate: number) => {
  const data: any[] = [];
  await movementsRef
    .orderBy('date', 'asc')
    .startAt(fromDate)
    .endAt(toDate)
    .get()
    .then(snapShot => {
      if (snapShot.empty) {
        console.log('F');
      } else {
        snapShot.docs.forEach(doc => {
          const newObj = {
            date: doc.get('date'),
            type: doc.get('type'),
            value: doc.get('value'),
          };
          data.push(newObj);
        });
      }
    });
  return data;
};
