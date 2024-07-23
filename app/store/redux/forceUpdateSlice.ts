import {createSlice} from '@reduxjs/toolkit';

export interface IForceUpdateModalReduxState {
  isUpdateRequired: boolean;
  versionRequired: string;
  appLink: string;
}

const initialState: IForceUpdateModalReduxState = {
  isUpdateRequired: false,
  versionRequired: '',
  appLink: '',
};

const forceUpdateSlice = createSlice({
  name: 'forceUpdateModal',
  initialState,
  reducers: {
    showForceUpdateModal(
      state,
      {payload: {isUpdateRequired, versionRequired, appLink}},
    ) {
      state.isUpdateRequired = isUpdateRequired;
      state.versionRequired = versionRequired;
      state.appLink = appLink;
    },
  },
});

export const {showForceUpdateModal} = forceUpdateSlice.actions;

export default forceUpdateSlice.reducer;
