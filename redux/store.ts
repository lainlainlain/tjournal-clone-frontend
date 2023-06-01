import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userReducer, userSlice } from './slices/user';
import { combineReducers } from '@reduxjs/toolkit';

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
    devTools: true,
  });

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
