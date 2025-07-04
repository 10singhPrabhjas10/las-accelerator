import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Slices
import userSlice from './userSlice';
import modalSlice from './modalSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import localizationSlice from './localizationSlice';
import snackbarSlice from './snackbarSlice';
import channelPartnerSlice from './channelPartnerSlice';
import forceUpdateSlice from './forceUpdateSlice';
import logger from 'redux-logger';
import expenseFormReducer from './expenseFormSlice';

const rootReducer = combineReducers({
  user: userSlice,
  modal: modalSlice,
  localization: localizationSlice,
  snackbar: snackbarSlice,
  channelPartner: channelPartnerSlice,
  forceUpdate: forceUpdateSlice,
  expenseForm: expenseFormReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['modal', 'channelPartner', 'forceUpdate', 'snackbar'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
