import React, { createContext, ReactElement, useReducer } from 'react';
import Cookies from 'js-cookie';
import { ProductObj } from './Interfaces';

export interface IState {
  darkMode: boolean;
  cart: {
    cartItems: ICartItem[];
  };
}

export interface IAction {
  type: string;
  payload?: ICartItem;
}

export interface ICartItem extends ProductObj {
  quantity: number;
}

interface IProviderProps {
  children: ReactElement | ReactElement[];
}

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems')!)
      : [],
  },
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
    case 'CART_ADD_ITEM': {
      if (action.payload) {
        const newItem = action.payload;
        const existingItem = state.cart.cartItems.find(
          (i) => i._id === newItem?._id
        );
        const cartItems = existingItem
          ? state.cart.cartItems.map((item) =>
              item._id === existingItem._id ? newItem : item
            )
          : [...state.cart.cartItems, newItem];
        Cookies.set('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      console.error('No Product to be Added!');
    }
    default:
      return state;
  }
}

export function StoreProvider(props: IProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
