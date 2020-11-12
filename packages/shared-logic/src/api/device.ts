import {secureInstance} from "./base";
import {ServerResponse} from '../types/response';
import {Device} from "..";

export async function getDeviceByCompany(key: string, {
  companyId
} : {
  companyId: string
}) : ServerResponse<Device[]> {
  return secureInstance.get(`/device/GetDeviceByCompany/${companyId}`);
}

export async function getDeviceById(key: string, {
  deviceId
} : {
  deviceId: string
}) {
  return secureInstance.get(`/device/GetDeviceInfo/${deviceId}`);
}