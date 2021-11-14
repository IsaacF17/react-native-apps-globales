import React from 'react';
import { ICategory } from '../types/categories';
import { IScheduledMovement } from '../types/movements';

export interface IGlobalContextData {
  scheduledMovements: Array<IScheduledMovement>;
  testCategoryList: Array<ICategory>;
  user?: any;
}

export interface IGlobalContextDispatchers {
  setScheduledMovements: React.Dispatch<
    React.SetStateAction<IScheduledMovement[]>
  >;
  setTestCategoryList?: (newState: Array<ICategory>) => void;
  setUser?: (newState: any) => void;
}

export type IGlobalContext = IGlobalContextData & IGlobalContextDispatchers;

export default React.createContext<IGlobalContext>({} as IGlobalContext);
