import {PUBLIC_API_TOKEN} from '@env';
import {ErrorEnum} from 'constants/errors';
import {HttpStatusCode, POST} from 'constants/httpConstants';
import {SnackBarEnum} from 'constants/modalTypes';
import {SetStateAction} from 'react';
import Config from 'react-native-config';
import {sendOTP, verifyOTP} from 'services/methods/auth';
import NetworkRequest from 'services/networkRequest';
import {authenticateUserWithSFDC} from 'services/sfdcApi';
import {showOtpModal} from 'store/redux/modalSlice';
import {showSnackbar} from 'store/redux/snackbarSlice';
import {store} from 'store/redux/store';
import {updateIsAuthenticated, updateUser} from 'store/redux/userSlice';
import {setStorageData} from 'utils/AppStorage';
import {handleApiError} from 'utils/CommonReduxMethods';
import {sendOtpResponse, verifyOtpResponse} from 'utils/dummyData';

export const handleGetOtp = async (
  mobileNumber: string,
  setIsLoading: SetStateAction<any>,
  onSuccess: (resendBlockDurationSeconds: number) => void,
) => {
  setIsLoading(true);
  try {
    const body = {
      mobileNumber: mobileNumber,
    };
    // const result = await NetworkRequest(POST, sendOTP(), body, {
    //   headers: {
    //     'skip-token': 'true',
    //     Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`,
    //   },
    // });
    const result = sendOtpResponse;
    if (result?.status === HttpStatusCode.CREATED) {
      onSuccess(result?.data?.resendBlockDurationSeconds);
    }
  } catch (error: any) {
    if (error.status === HttpStatusCode.FORBIDDEN) {
      store.dispatch(
        showOtpModal({
          isVisible: true,
          header: error?.data?.title,
          content: error?.data?.message,
          showContactDetails: true,
        }),
      );
    } else {
      handleApiError(error?.data?.message);
    }
  } finally {
    setIsLoading(false);
  }
};

export const handleResendOtp = async (
  mobileNumber: string,
  setResendOtpTimer: SetStateAction<any>,
) => {
  try {
    const body = {
      mobileNumber: mobileNumber,
    };
    // const result = await NetworkRequest(POST, sendOTP(), body, {
    //   headers: {
    //     'skip-token': 'true',
    //     Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`,
    //   },
    // });
    const result = sendOtpResponse;

    setResendOtpTimer(59);
    store.dispatch(
      showSnackbar({
        isVisible: true,
        text: result?.data?.message || ErrorEnum.somethingWentWrong,
        type: SnackBarEnum.SUCCESS,
      }),
    );
  } catch (error: any) {
    if (error.status === HttpStatusCode.FORBIDDEN) {
      store.dispatch(
        showOtpModal({
          isVisible: true,
          header: error.data.title,
          content: error.data.message,
          showContactDetails: true,
        }),
      );
    } else {
      handleApiError(error.message);
    }
  }
};

export const handleVerifyOtp = async (
  mobileNumber: string,
  otp: string,
  setIsLoading: SetStateAction<any>,
  setErrorMsg: SetStateAction<any>,
  setOtp: SetStateAction<any>,
) => {
  setIsLoading(true);
  try {
    // const body = {
    //   mobileNumber: mobileNumber,
    //   otp: Number(otp),
    // };
    // const result = await NetworkRequest(POST, verifyOTP(), body, {
    //   headers: {
    //     'skip-token': 'true',
    //     Authorization: `Bearer ${Config.PUBLIC_API_TOKEN}`,
    //   },
    // });

    const result = verifyOtpResponse;

    const {
      data: {accessToken, refreshToken, userType},
    } = result;

    await authenticateUserWithSFDC();
    await setStorageData('ACCESS_TOKEN', accessToken);
    await setStorageData('REFRESH_TOKEN', refreshToken);
    await setStorageData('USER_TYPE', userType);

    store.dispatch(updateIsAuthenticated(true));
    store.dispatch(updateUser(result?.data));
  } catch (error: any) {
    if (error.status === HttpStatusCode.FORBIDDEN) {
      store.dispatch(
        showOtpModal({
          isVisible: true,
          header: error.data.title,
          content: error.data.message,
          showContactDetails: true,
        }),
      );
    } else if (error.status === HttpStatusCode.NOT_FOUND) {
      setErrorMsg(error?.data?.message);
    } else {
      handleApiError(error.message);
    }
  } finally {
    setOtp('');
    setIsLoading(false);
  }
};
