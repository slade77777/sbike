import {secureInstance} from "./base";

export async function getCurrentDeviceLocation(key: string, {
  deviceIds
} : {
  deviceIds: Array<string>
}) {
  console.log(key);
  return secureInstance.post('/location', deviceIds);
}