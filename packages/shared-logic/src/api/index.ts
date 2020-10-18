import {setSecureAxiosInstance} from './base';
import * as apartment from './apartment';
import * as project from './project';
import * as agent from './agent';
import * as customerRequest from './customerRequest';
import * as articles from './articles';
import * as province from './province';
import * as event from './event';
import {ApiLayer} from './apiLayer';

export let api: ApiLayer;

export function setApi(apiInstance: ApiLayer) {
  api = apiInstance;
}

export function createApi(baseUrl: string): ApiLayer {
  setSecureAxiosInstance(baseUrl);
  return {
    ...apartment,
    ...project,
    ...agent,
    ...customerRequest,
    ...articles,
    ...province,
    ...event,
  };
}
