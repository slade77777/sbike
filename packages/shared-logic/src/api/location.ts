import {secureInstance} from "./base";

export async function getCurrentDeviceLocation() {
  return secureInstance.post('/location', ['022202700999']);
}