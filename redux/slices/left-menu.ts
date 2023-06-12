import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface LeftMenuState {
  active: boolean;
}

const initialState: LeftMenuState = {
  active: true,
};

export const leftMenuSlice = createSlice({
  name: 'leftmenu',
  initialState,
  reducers: {
    toggleSwitchLeftMenu(state) {
      state.active = !state.active;
    },
  },
});

export const { toggleSwitchLeftMenu } = leftMenuSlice.actions;

export const selectLeftMenuActive = (state: AppState) => state.leftmenu.active;

export const leftMenuReducer = leftMenuSlice.reducer;
