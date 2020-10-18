import {useMemo} from 'react';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
  Store,
} from 'redux';
import rootReducer from './rootReducers';

let store: Store | undefined;

const initialState = {};

const initStore = (preloadedState: any = initialState) => {
  /* eslint-disable no-undef */
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  /* eslint-enable */
  return createReduxStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};
/* eslint-enable */
export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState?: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
