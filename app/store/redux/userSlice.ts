import {createSlice} from '@reduxjs/toolkit';
import {IUserReduxState} from 'types/redux';

const initialState: IUserReduxState = {
  isAuthenticated: false,
  isFirstTimeAppLaunch: true,
  user: null,
  sfdcUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    updateIsFirstTimeAppLaunch(state, action) {
      state.isFirstTimeAppLaunch = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    updateSfdcUser(state, action) {
      state.sfdcUser = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.sfdcUser = null;
      state.isAuthenticated = false;
      state.sfdcUser = null;
    },
  },
});

export const {
  updateIsAuthenticated,
  updateIsFirstTimeAppLaunch,
  updateUser,
  clearUser,
  updateSfdcUser,
} = userSlice.actions;

export default userSlice.reducer;
