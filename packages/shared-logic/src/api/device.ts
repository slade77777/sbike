import {secureInstance} from "./base";

export async function getDeviceByCompany(key: string, {
  companyId
} : {
  companyId: string
}) {
  return secureInstance.get(`/device/GetDeviceByCompany/${companyId}`);
}

export async function getDeviceById(key: string, {
  deviceId
} : {
  deviceId: string
}) {
  return secureInstance.get(`/device/GetDeviceInfo/${deviceId}`);
}