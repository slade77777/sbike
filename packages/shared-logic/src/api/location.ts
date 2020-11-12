import {secureInstance} from "./base";

export async function getCurrentDeviceLocation(key: string, {
  deviceIds
} : {
  deviceIds: Array<string>
}) {
  return secureInstance.post('/location', deviceIds);
}