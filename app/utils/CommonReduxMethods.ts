import {ErrorEnum} from 'constants/errors';
import {SnackBarEnum} from 'constants/modalTypes';
import {setLoading} from 'store/redux/modalSlice';
import {showSnackbar} from 'store/redux/snackbarSlice';
import {store} from 'store/redux/store';

export const handleApiError = (error: any) => {
  store.dispatch(
    showSnackbar({
      isVisible: true,
      text: error || ErrorEnum.somethingWentWrong,
      type: SnackBarEnum.ERROR,
    }),
  );
};

export const setReduxLoading = (isLoading: boolean) => {
  store.dispatch(setLoading({isLoading: isLoading}));
};
