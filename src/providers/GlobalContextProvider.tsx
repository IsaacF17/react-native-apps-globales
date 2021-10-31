import React, { useState } from 'react';
import GlobalContext, { IGlobalContext } from '../contexts/GlobalContext';

const GlobalContextProvider: React.FC = props => {
  const { children } = props;

  const [test, setTest] = useState<string>("This is the initial 'test' value");

  const contextValue: IGlobalContext = {
    test,
    setTest,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
