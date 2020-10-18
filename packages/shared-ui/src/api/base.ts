import {Platform} from 'react-native';
import {default as axios, AxiosInstance} from 'axios';
import * as AxiosLogger from 'axios-logger';
import {mapResponse, mapError} from './../@types/response';
import {FirebaseAuth} from './../firebase/';

export let secureInstance: AxiosInstance;
export let mockInstance: AxiosInstance;
export let transactionMockInstance: AxiosInstance;

export function setSecureAxiosInstance(baseURL: string) {
  if (!baseURL) {
    throw new Error(
      'Unable to resolve Base URL. Ensure that the environment variable is properly set up',
    );
  }
  const timeout = 20000;
  secureInstance = axios.create({
    timeout,
    baseURL,
  });

  if (Platform.OS !== 'web' && __DEV__) {
    secureInstance.interceptors.request.use(
      AxiosLogger.requestLogger,
      AxiosLogger.errorLogger,
    );

    secureInstance.interceptors.response.use(
      AxiosLogger.responseLogger,
      AxiosLogger.errorLogger,
    );
  }

  secureInstance.interceptors.request.use(
    async function (config) {
      const token = await FirebaseAuth?.currentUser?.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return error;
    },
  );

  secureInstance.interceptors.response.use(
    function (response) {
      return mapResponse(response);
    },
    function (error) {
      return mapError(error);
    },
  );

  mockInstance = axios.create({
    timeout,
    baseURL: 'https://api-dev-1h.vinid.dev/mocker/',
  });

  transactionMockInstance = axios.create({
    timeout,
    baseURL: 'https://api-dev-1h.vinid.dev/mocker/transaction-platform',
  });
}
