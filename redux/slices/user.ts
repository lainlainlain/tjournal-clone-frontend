import { ResponseUser } from '@/utils/api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

export interface UserState {
  data: ResponseUser | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<ResponseUser>) {
      state.data = action.payload;
    },
    clearUserData(state) {
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.user,
      };
    });
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const selectUserData = (state: AppState) => state.user.data;

export const userReducer = userSlice.reducer;
