import {secureInstance} from "./base";

export async function getCurrentDeviceLocation() {
  return secureInstance.get('/location');
}