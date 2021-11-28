import React, { createContext, ReactElement, useReducer } from 'react';
import Cookies from 'js-cookie';

export interface IState {
  darkMode: boolean;
}

export interface IAction {
  type: string;
}

interface IProviderProps {
  children: ReactElement | ReactElement[];
}

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
};

export const Store: any = createContext<{ state: IState; action: IAction }>(
  null!
);

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };

    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    default:
      return state;
  }
}

export function StoreProvider(props: IProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
