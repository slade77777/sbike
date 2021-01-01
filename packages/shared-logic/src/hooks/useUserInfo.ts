import {useQuery, QueryConfig} from 'react-query';
import {getUserInfo} from '../api/user';
import {secureInstance} from '../api/base';

export default function (options?: QueryConfig<any>) {
  const session = secureInstance?.defaults?.headers?.API_KEY || '';
  return useQuery('userInfo', getUserInfo, {
    ...options,
    enabled: !!session,
  });
}
