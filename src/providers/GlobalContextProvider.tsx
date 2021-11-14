import React, { useEffect, useState } from 'react';
import GlobalContext, { IGlobalContext } from '../contexts/GlobalContext';
import { ICategory } from '../types/categories';
import { IScheduledMovement } from '../types/movements';
import scheduledService from '../firebase/Scheduled';

const GlobalContextProvider: React.FC = props => {
  const { children } = props;

  const [user, setUser] = useState<{ [key: string]: any }>({});
  const [scheduledMovements, setScheduledMovements] = useState<
    Array<IScheduledMovement>
  >([]);

  const [testCategoryList, setTestCategoryList] = useState<Array<ICategory>>([
    { iconName: 'bus', name: 'Transporte' },
    { iconName: 'wrench', name: 'Mantenimientos' },
    { iconName: 'medkit', name: 'Salud' },
    { iconName: 'money', name: 'Salarios' },
    { iconName: 'bus', name: 'Transporte' },
    { iconName: 'wrench', name: 'Mantenimientos' },
    { iconName: 'medkit', name: 'Salud' },
    { iconName: 'money', name: 'Salarios' },
    { iconName: 'bus', name: 'Transporte' },
    { iconName: 'wrench', name: 'Mantenimientos' },
    { iconName: 'medkit', name: 'Salud' },
    { iconName: 'money', name: 'Salarios' },
  ]);

  const contextValue: IGlobalContext = {
    scheduledMovements,
    setScheduledMovements,
    testCategoryList,
    setTestCategoryList,
    user,
    setUser,
  };

  useEffect(() => {
    // if (user.id) {
    console.log(`Fallas loading scheduled movements...`);
    scheduledService
      .getAll()
      .then(response => setScheduledMovements(response ?? []));
    // }
  }, [user.id]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
