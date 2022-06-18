import { createContext, useContext } from 'react';
import { RootStore } from './root-store';
import { assert } from 'ts-essentials';

export const StoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
  const context = useContext(StoreContext);
  assert(context);
  return context;
};
