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

  const [categoriesList, setCategoriesList] = useState<Array<any>>([{}]);

  const contextValue: IGlobalContext = {
    scheduledMovements,
    setScheduledMovements,
    categoriesList,
    setCategoriesList,
    user,
    setUser,
  };

  useEffect(() => {
    if (user.id) {
      scheduledService
        .getAll(user.id)
        .then(response => setScheduledMovements(response ?? []));
    }
  }, [user, user.id]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
