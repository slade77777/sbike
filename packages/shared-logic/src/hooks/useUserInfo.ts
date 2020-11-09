import {useQuery} from 'react-query';
import {getUserInfo} from '../api/user';

export default function () {
  return useQuery('userInfo', getUserInfo);
}
