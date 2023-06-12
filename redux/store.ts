import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userReducer, userSlice } from './slices/user';
import { combineReducers } from '@reduxjs/toolkit';
import { leftMenuReducer } from './slices/left-menu';

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      leftmenu: leftMenuReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
