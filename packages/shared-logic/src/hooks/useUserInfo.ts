import {useQuery, QueryConfig} from 'react-query';
import {getUserInfo} from '../api/user';

export default function (options?: QueryConfig<any>) {
  return useQuery('userInfo', getUserInfo, options);
}
