import {useQuery} from 'react-query';
import {getDeviceByCompany} from '../api/device';

export default function (companyId: string) {
  return useQuery(['companyDevice', {companyId}], getDeviceByCompany);
}
