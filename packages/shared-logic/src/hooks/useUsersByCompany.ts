import {useQuery} from 'react-query';
import {getUserByCompany} from '../api/user';

export default function () {
  return useQuery('usersByCompany', getUserByCompany);
}
