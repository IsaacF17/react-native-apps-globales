import React, { useEffect, useState } from 'react';
import GlobalContext, { IGlobalContext } from '../contexts/GlobalContext';
import { ICategory } from '../types/categories';
import { IMovement, IScheduledMovement } from '../types/movements';
import MovementService from '../firebase/Movement';
import ScheduledService from '../firebase/Scheduled';
import { orderBy } from 'lodash';
import { getTomorrow } from '../utils/unix';

const GlobalContextProvider: React.FC = props => {
  const { children } = props;

  const [user, setUser] = useState<{ [key: string]: any }>({});
  const [scheduledMovements, setScheduledMovements] = useState<
    Array<IScheduledMovement>
  >([]);
  const [expiredMovements, setExpiredMovements] = useState<
    Array<IScheduledMovement>
  >([]);
  const [movementList, setMovementList] = useState<Array<IMovement>>([]);
  const [categoriesList, setCategoriesList] = useState<Array<any>>([{}]);
  const [homeChartData, setHomeChartData] = useState<any>({});

  const loadMovements = async () => {
    if (user.id) {
      const response = await MovementService.getAllThisWeek(user.id);
      setMovementList(response ? orderBy(response, ['date'], ['asc']) : []);
    }
  };

  const loadScheduledMovements = async () => {
    const response = await ScheduledService.getAll(user.id);
    setScheduledMovements(
      response ? orderBy(response, ['nextDate'], ['asc']) : [],
    );
  };

  useEffect(() => {
    const tomorrowAsUnix = getTomorrow();
    const expiredMovements = scheduledMovements.filter(
      movement => movement.nextDate < tomorrowAsUnix,
    );
    setExpiredMovements(expiredMovements);
  }, [scheduledMovements]);

  useEffect(() => {
    if (user.id) {
      loadMovements();
      loadScheduledMovements();
    }
  }, [user, user.id]);

  const contextValue: IGlobalContext = {
    scheduledMovements,
    setScheduledMovements,
    refreshScheduledMovements: loadScheduledMovements,
    movementList,
    setMovementList,
    refreshMovementList: loadMovements,
    expiredMovements,
    setExpiredMovements,
    categoriesList,
    setCategoriesList,
    user,
    setUser,
    homeChartData,
    setHomeChartData,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
