import axios from 'axios';
import apiErrAuthHandler from './auth/apiErrAuthHandler';
import apiErrRetryHandler from './auth/apiErrRetryHandler';
import { userSession } from '../../lib/user';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND
});

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${userSession.getToken()}`;

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    let shouldRequest = false;
    shouldRequest ||= await apiErrAuthHandler(error);
    shouldRequest ||= await apiErrRetryHandler(error);

    if (shouldRequest) {
      return $api.request(error.config);
    }

    throw error;
  }
);

export default $api;
