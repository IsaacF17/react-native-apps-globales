import React from 'react';

export interface IGlobalContext {
  test?: string;
  setTest?: Function;
  user?: any;
  setUser?: Function;
}

export default React.createContext<IGlobalContext>({} as IGlobalContext);
