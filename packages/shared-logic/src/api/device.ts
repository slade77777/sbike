import {ServerResponse} from '../types/response';
import {Device} from '..';
import {secureInstance} from './base';

export async function getDeviceByCompany(
  _: string,
  companyId: string,
): ServerResponse<Device[]> {
  return secureInstance.get(`/device/GetDeviceByCompany/${companyId}`);
}

export async function getDevicesByCompanyID(
  companyId: string,
): ServerResponse<Device[]> {
  return secureInstance.get(`/device/GetDeviceByCompany/${companyId}`);
}

export async function getDeviceById(
  _: string,
  deviceId: string,
): ServerResponse<Device> {
  return secureInstance.get(`/device/GetDeviceInfo/${deviceId}`);
}

export async function updateDeviceInfo(params: Device) {
  return secureInstance.post(`/device/UpdateDeviceInfo`, params);
}
