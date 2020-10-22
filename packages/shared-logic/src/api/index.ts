import {setSecureAxiosInstance} from './base';
import * as userApi from './user';
import {ApiLayer} from './apiLayer';

export let api: ApiLayer;

export function setApi(apiInstance: ApiLayer) {
  api = apiInstance;
}

export function createApi(baseUrl: string): ApiLayer {
  setSecureAxiosInstance(baseUrl);
  return {
    ...userApi,
  };
}
