import React from 'react';
import { ICategory } from '../types/categories';
import { IMovement } from '../types/movements';

export interface IGlobalContextData {
  testMovementsData: Array<IMovement>;
  testCategoryList: Array<ICategory>;
}

export interface IGlobalContextDispatchers {
  setTestMovementsData?: (newState: Array<IMovement>) => void;
  setTestCategoryList?: (newState: Array<ICategory>) => void;
}

export type IGlobalContext = IGlobalContextData & IGlobalContextDispatchers;

export default React.createContext<IGlobalContext>({} as IGlobalContext);
