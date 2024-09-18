// Custom hook to create the Axios client
import axios, {AxiosInstance} from 'axios';
import {refreshAccessToken} from './methods/auth';
import {getStorageData, setStorageData} from 'utils/AppStorage';
import {store} from 'store/redux/store';
import {showOtpModal} from 'store/redux/modalSlice';
import {HttpStatusCode} from 'constants/httpConstants';
import Config from 'react-native-config';
import {authenticateUserWithSFDC} from './sfdcApi';
import {useError} from '@/globalErrorHandler/ErroProvider';

const useAxiosClient = () => {
  const {showError} = useError();

  const axiosClient: AxiosInstance = axios.create({
    baseURL: Config.BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let isRefreshing = false;
  const failedQueue: Array<{
    resolve: (token?: string | null) => void;
    reject: (error: any) => void;
  }> = [];

  // Show login modal for expired sessions
  const showLoginModal = () => {
    store.dispatch(
      showOtpModal({
        isVisible: true,
        header: 'Session Expired',
        content: 'Please Login again',
        buttonText: 'Login',
      }),
    );
  };

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom =>
      error ? prom.reject(error) : prom.resolve(token),
    );
    failedQueue.length = 0; // Clear the queue
  };

  // Request interceptor
  axiosClient.interceptors.request.use(
    async config => {
      const token = await getStorageData('ACCESS_TOKEN');
      if (token && config.headers['skip-auth'] !== 'true') {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Response interceptor
  axiosClient.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error?.response?.status === HttpStatusCode.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = await getStorageData('REFRESH_TOKEN');
        if (!refreshToken) {
          showLoginModal();
          return Promise.reject(new Error('No refresh token available'));
        }

        try {
          const tokenResponse = error?.response?.config?.url?.includes(
            'salesforce',
          )
            ? await authenticateUserWithSFDC()
            : await refreshAccessToken(refreshToken);

          const accessToken =
            tokenResponse?.data?.accessToken ||
            tokenResponse?.data?.access_token;

          if (!accessToken) {
            showLoginModal();
            return Promise.reject(
              new Error('Failed to retrieve new access token'),
            );
          }

          await setStorageData('ACCESS_TOKEN', accessToken);
          await setStorageData(
            'REFRESH_TOKEN',
            tokenResponse?.data?.refreshToken,
          );

          axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosClient(originalRequest);
        } catch (err) {
          processQueue(err, null);
          showLoginModal();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response) {
        switch (error.response.status) {
          case HttpStatusCode.BAD_REQUEST:
            showError(
              'Invalid request. Please check your input and try again.',
              originalRequest,
            );
            break;
          case HttpStatusCode.FORBIDDEN:
            showError(
              'You do not have permission to perform this action.',
              originalRequest,
            );
            break;
          case HttpStatusCode.NOT_FOUND:
            showError('The requested resource was not found.', originalRequest);
            break;
          case HttpStatusCode.INTERNAL_SERVER:
            showError(
              'An internal server error occurred. Please try again later.',
              originalRequest,
            );
            break;
          default:
            showError(
              `An error occurred: ${
                error.response.data.message || 'Something went wrong'
              }`,
              originalRequest,
            );
        }
      } else if (error.request) {
        showError(
          'No response received from the server. Please check your internet connection.',
          originalRequest,
        );
      } else {
        showError(
          'An unexpected error occurred. Please try again later.',
          originalRequest,
        );
      }
      return Promise.reject({
        data: error?.response?.data,
        status: error?.response?.status,
      });
    },
  );

  return axiosClient;
};

export default useAxiosClient;
