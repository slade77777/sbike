import {secureInstance} from './base';
import {ServerResponse} from '../types/response';
import {Device} from '..';

export async function getDeviceByCompany(
  _: string,
  companyId: string,
): ServerResponse<Device[]> {
  return secureInstance.get(`/device/GetDeviceByCompany/${companyId}`);
}

export async function getDeviceById(deviceId: string): ServerResponse<Device> {
  return secureInstance.get(`/device/GetDeviceInfo/${deviceId}`);
}
