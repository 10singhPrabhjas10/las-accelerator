import {createSlice} from '@reduxjs/toolkit';
import {SnackBarEnum, PostionEnum} from 'constants/modalTypes';

export interface ISnackBarReduxState {
  isVisible: boolean;
  text: string;
  type: SnackBarEnum;
  position?: PostionEnum;
}
const initialState: ISnackBarReduxState = {
  isVisible: false,
  text: '',
  type: SnackBarEnum.SUCCESS,
  position: PostionEnum.BOTTOM,
};

const snackbarSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showSnackbar(state, action) {
      state.isVisible = action.payload.isVisible;
      state.text = action.payload.text;
      state.type = action.payload.type;
      state.position = action.payload.position || PostionEnum.BOTTOM;
    },
    hideSnackbar() {
      return initialState;
    },
  },
});

export const {showSnackbar, hideSnackbar} = snackbarSlice.actions;

export default snackbarSlice.reducer;
