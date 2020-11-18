import {useQuery} from 'react-query';
import {getDeviceById} from "../api/device";

export default function (deviceId: string) {
  return useQuery(['deviceId', deviceId], getDeviceById);
}
