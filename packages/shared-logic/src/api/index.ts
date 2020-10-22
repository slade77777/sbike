import {setSecureAxiosInstance} from './base';
import * as project from './project';
import {ApiLayer} from './apiLayer';

export let api: ApiLayer;

export function setApi(apiInstance: ApiLayer) {
  api = apiInstance;
}

export function createApi(baseUrl: string): ApiLayer {
  setSecureAxiosInstance(baseUrl);
  return {
    ...project,
  };
}
