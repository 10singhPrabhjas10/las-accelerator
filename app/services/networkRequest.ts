import {DELETE, GET, POST, PUT} from 'constants/httpConstants';
import axiosClient from './apiClient';

const NetworkRequest = (
  method: string,
  url: string,
  body?: any,
  config?: any,
) => {
  switch (method) {
    case GET:
      return axiosClient({
        method: 'get',
        url,
        ...config,
      });

    case POST:
      return axiosClient({
        method: 'post',
        url,
        data: body,
        ...config,
      });

    case PUT:
      return axiosClient({
        method: 'put',
        url,
        data: body,
        ...config,
      });

    case DELETE:
      return axiosClient({
        method: 'delete',
        url,
        ...config,
      });

    default:
      throw new Error('Incorrect Network Request');
  }
};

export default NetworkRequest;
