import {setSecureAxiosInstance} from './base';
import * as agent from './agent';
import * as transaction from './transaction';
import * as address from './address';
import * as purpose from './purpose';
import * as apartment from './apartment';
import * as device from './device';
import * as notification from './notification';
import * as order from './order';
import * as inventory from './inventory';
import {ApiLayer} from './types';

export function createApi(baseUrl: string): ApiLayer {
  setSecureAxiosInstance(baseUrl);
  return {
    ...agent,
    ...transaction,
    ...address,
    ...purpose,
    ...apartment,
    ...device,
    ...notification,
    ...order,
    ...inventory,
  };
}
