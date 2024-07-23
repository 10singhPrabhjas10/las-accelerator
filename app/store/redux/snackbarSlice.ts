import {createSlice} from '@reduxjs/toolkit';
import {SnackBarEnum} from 'constants/modalTypes';

export interface ISnackBarReduxState {
  isVisible: boolean;
  text: string;
  type: SnackBarEnum;
}
const initialState: ISnackBarReduxState = {
  isVisible: false,
  text: '',
  type: SnackBarEnum.SUCCESS,
};

const snackbarSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showSnackbar(state, action) {
      state.isVisible = action.payload.isVisible;
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    hideSnackbar() {
      return initialState;
    },
  },
});

export const {showSnackbar, hideSnackbar} = snackbarSlice.actions;

export default snackbarSlice.reducer;
