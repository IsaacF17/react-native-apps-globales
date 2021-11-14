import React from 'react';
import { ICategory } from '../types/categories';
import { IMovement } from '../types/movements';

export interface IGlobalContextData {
  testMovementsData: Array<IMovement>;
  categoriesList: Array<ICategory>;
  user?: any;
}

export interface IGlobalContextDispatchers {
  setTestMovementsData?: (newState: Array<IMovement>) => void;
  setCategoriesList: (newState: Array<ICategory>) => void;
  setUser: (newState: any) => void;
}

export type IGlobalContext = IGlobalContextData & IGlobalContextDispatchers;

export default React.createContext<IGlobalContext>({} as IGlobalContext);
