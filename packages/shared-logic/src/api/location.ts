import {secureInstance} from './base';

export async function getCurrentDeviceLocation(
  _: string,
  deviceIds: Array<string>,
) {
  return secureInstance.post('/location', deviceIds);
}

export async function getHistory(params: {
  deviceID: string;
  from: string;
  to: string;
}) {
  return secureInstance.get(
    `/location/${params.deviceID}/${params.from}/${params.to}`,
  );
}

export async function getCurrentLocation(deviceIDs: Array<string>) {
  return secureInstance.post('/location', {
    deviceIDs,
  });
}
