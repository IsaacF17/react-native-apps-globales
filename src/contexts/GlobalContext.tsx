import React from 'react';
import { ICategory } from '../types/categories';
import { IScheduledMovement } from '../types/movements';

export interface IGlobalContextData {
  scheduledMovements: Array<IScheduledMovement>;
  categoriesList: Array<ICategory>;
  user?: any;
}

export interface IGlobalContextDispatchers {
  setScheduledMovements: React.Dispatch<
    React.SetStateAction<Array<IScheduledMovement>>
  >;
  setCategoriesList: React.Dispatch<React.SetStateAction<Array<ICategory>>>;
  setUser: (newState: any) => void;
}

export type IGlobalContext = IGlobalContextData & IGlobalContextDispatchers;

export default React.createContext<IGlobalContext>({} as IGlobalContext);
