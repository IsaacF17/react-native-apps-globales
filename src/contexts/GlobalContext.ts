import React, { createContext } from 'react';
import { ICategory } from '../types/categories';
import { IMovement, IScheduledMovement } from '../types/movements';

export interface IGlobalContextData {
  scheduledMovements: Array<IScheduledMovement>;
  movementList: Array<IMovement>;
  expiredMovements: Array<IScheduledMovement>;
  categoriesList: Array<ICategory>;
  user?: any;
}

export interface IGlobalContextDispatchers {
  setScheduledMovements: React.Dispatch<
    React.SetStateAction<Array<IScheduledMovement>>
  >;
  refreshScheduledMovements: () => void;
  setMovementList: React.Dispatch<React.SetStateAction<Array<IMovement>>>;
  refreshMovementList: () => void;
  setExpiredMovements: React.Dispatch<
    React.SetStateAction<Array<IScheduledMovement>>
  >;
  setCategoriesList: React.Dispatch<React.SetStateAction<Array<ICategory>>>;
  setUser: (newState: any) => void;
}

export type IGlobalContext = IGlobalContextData & IGlobalContextDispatchers;

export default createContext<IGlobalContext>({} as IGlobalContext);
