import {secureInstance} from "./base";

export async function getCurrentDeviceLocation(_: string, deviceIds: Array<string>) {
  return secureInstance.post('/location', deviceIds);
}