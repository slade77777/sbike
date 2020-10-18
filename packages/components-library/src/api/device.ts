import {RegisterDeviceTokenRequest} from '../@types/device';
import {ServerResponse} from './types';
import {secureInstance} from './base';

export async function registerDeviceToken(
  request: RegisterDeviceTokenRequest,
): ServerResponse<any> {
  const res = await secureInstance.post(`v1/me/devices`, request);
  return res.data;
}
