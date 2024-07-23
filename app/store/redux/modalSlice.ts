import {createSlice} from '@reduxjs/toolkit';
import {IModalReduxState} from 'types/redux';

const initialState: IModalReduxState = {
  isVisible: false,
  header: '',
  content: '',
  buttonText: 'Dismiss',
  showContactDetails: false,
  isLoading: false,
  tabIndex: 0,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showOtpModal(state, action) {
      state.isVisible = action.payload.isVisible;
      state.header = action.payload.header;
      state.content = action.payload.content;
      state.buttonText = action.payload.buttonText ?? initialState.buttonText;
      state.showContactDetails = action.payload.showContactDetails;
    },
    hideModal() {
      return initialState;
    },
    setLoading(state, {payload: {isLoading}}) {
      state.isLoading = isLoading;
    },
    updateTabIndex(state, action) {
      state.tabIndex = action.payload;
    },
  },
});

export const {showOtpModal, hideModal, setLoading, updateTabIndex} =
  modalSlice.actions;

export default modalSlice.reducer;
