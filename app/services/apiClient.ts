//External dependencies
import axios, {AxiosInstance} from 'axios';

//Internal dependencies
import {refreshAccessToken} from './methods/auth';
import {getStorageData, setStorageData} from 'utils/AppStorage';
import {store} from 'store/redux/store';
import {showOtpModal} from 'store/redux/modalSlice';
import {HttpStatusCode} from 'constants/httpConstants';
import Config from 'react-native-config';
import {authenticateUserWithSFDC} from './sfdcApi';

function showLoginModal() {
  store.dispatch(
    showOtpModal({
      isVisible: true,
      header: 'Session Expired',
      content: 'Please Login again',
      buttonText: 'Login',
    }),
  );
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
  // signal: newAbortSignal(),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token = await getStorageData('ACCESS_TOKEN');
    const skipAuth = config.headers['skip-auth'];
    const isSkip = skipAuth === 'true';

    if (token && !isSkip) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token?: string | null) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error?.response?.status === HttpStatusCode.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
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
        if (error?.response?.config?.url?.includes('salesforce')) {
          await authenticateUserWithSFDC();
          return axiosClient(originalRequest);
        } else {
          const result = await refreshAccessToken(refreshToken);
          const accessToken = result?.data?.accessToken;

          if (!accessToken) {
            showLoginModal();
            return Promise.reject(
              new Error('Failed to retrieve new access token'),
            );
          }

          await setStorageData('ACCESS_TOKEN', accessToken);
          await setStorageData('REFRESH_TOKEN', result?.data?.refreshToken);

          axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        showLoginModal();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({
      data: error?.response?.data,
      status: error?.response?.status,
    });
  },
);

export default axiosClient;
