import React, { useEffect, useState } from 'react';
import GlobalContext, { IGlobalContext } from '../contexts/GlobalContext';
import { ICategory } from '../types/categories';
import { IMovement, IScheduledMovement } from '../types/movements';
import MovementService from '../firebase/Movement';
import ScheduledService from '../firebase/Scheduled';
import {
  getThisWeekUnixRange,
  getTodayAsDate,
  getTodayAsUnix,
  getTomorrowAsUnix,
} from '../utils/dates';
import { orderBy } from 'lodash';

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

  const loadMovements = async () => {
    const response = await MovementService.getAllThisWeek(user.id);
    setMovementList(response ? orderBy(response, ['date'], ['asc']) : []);
  };

  const loadScheduledMovements = async () => {
    const response = await ScheduledService.getAll(user.id);
    setScheduledMovements(
      response ? orderBy(response, ['nextDate'], ['asc']) : [],
    );
  };

  useEffect(() => {
    const tomorrowAsUnix = getTomorrowAsUnix();
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

  useEffect(() => {
    const todayAsDate = getTodayAsDate();
    const todayAsUnix = getTodayAsUnix();
    const tomorrowAsUnix = getTomorrowAsUnix();
    const { mondayUnix, nextMondayUnix } = getThisWeekUnixRange();
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('todayAsDate\t', todayAsDate);
    console.log('todayAsUnix\t', new Date(todayAsUnix));
    console.log('tomorrowAsUnix\t', new Date(tomorrowAsUnix));
    console.log('mondayUnix\t', new Date(mondayUnix));
    console.log('nextMondayUnix\t', new Date(nextMondayUnix));
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  }, []);

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
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
