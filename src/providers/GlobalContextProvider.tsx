import React, { useState } from 'react';
import GlobalContext, { IGlobalContext } from '../contexts/GlobalContext';
import { ICategory } from '../types/categories';
import { IMovement } from '../types/movements';

const GlobalContextProvider: React.FC = props => {
  const { children } = props;

  const [testMovementsData, setTestMovementsData] = useState<Array<IMovement>>([
    { type: 'expense', name: 'Netflix', value: 8000, nextDate: '01/10/21' },
    { type: 'income', name: 'Salario', value: 745000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Gym', value: 18000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Netflix', value: 8000, nextDate: '01/10/21' },
    { type: 'income', name: 'Salario', value: 745000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Gym', value: 18000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Netflix', value: 8000, nextDate: '01/10/21' },
    { type: 'income', name: 'Salario', value: 745000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Gym', value: 18000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Netflix', value: 8000, nextDate: '01/10/21' },
    { type: 'income', name: 'Salario', value: 745000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Gym', value: 18000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Netflix', value: 8000, nextDate: '01/10/21' },
    { type: 'income', name: 'Salario', value: 745000, nextDate: '01/10/21' },
    { type: 'expense', name: 'Gym', value: 18000, nextDate: '01/10/21' },
  ]);

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
    testMovementsData,
    setTestMovementsData,
    testCategoryList,
    setTestCategoryList,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
