import {useQuery} from 'react-query';
import {getCurrentDeviceLocation} from '../api/location';

export default function fetchCurrentDeviceLocation(deviceIds: Array<string>) {
  return useQuery(['currentDeviceLocation', {deviceIds}], getCurrentDeviceLocation);
}
