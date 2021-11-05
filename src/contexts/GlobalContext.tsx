import React, { Dispatch, SetStateAction } from 'react';

export interface IGlobalContext {
  test: string;
  setTest?: Dispatch<SetStateAction<string>>;
}

export default React.createContext<IGlobalContext>({} as IGlobalContext);
