import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { operatorReducer } from './reducers/OperatorSlice';
import { operatorAPI } from '../services/OperatorService';
import { operatorAddonAPI } from '../services/OperatorAddonService';
import { operatorAddonReducer } from './reducers';

const rootReducer = combineReducers({
  operatorReducer,
  operatorAddonReducer,
  [operatorAPI.reducerPath]: operatorAPI.reducer,
  [operatorAddonAPI.reducerPath]: operatorAddonAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(operatorAPI.middleware, operatorAddonAPI.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
