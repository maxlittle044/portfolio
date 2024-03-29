import React, { createContext, useReducer } from "react";

import { Reducer, InitialState } from "./reducer";

export const Context = createContext(InitialState);
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const Store = ({ element }) => <Provider>{element}</Provider>;
