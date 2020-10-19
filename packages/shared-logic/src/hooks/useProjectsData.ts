import {useQuery, QueryResult} from 'react-query';
import {secureInstance} from '../api/base';

const fetchProjects = () => secureInstance.get('/projects');

export default function (): QueryResult<any, {message?: string}> {
  return useQuery('projects', fetchProjects);
}
