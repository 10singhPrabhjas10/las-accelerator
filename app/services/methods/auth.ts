import {AUTH} from '../constants';
import axios from 'axios';

export const sendOTP = () => {
  return AUTH + 'sendOTP';
};

export const verifyOTP = () => {
  return AUTH + 'verifyOTP';
};

export const refreshAccessToken = async (token: string) => {
  return axios.post(AUTH + 'refreshToken', {token});
};
