import {ServerResponse} from '../types/response';
import {Project} from '../types/project';

import {secureInstance} from './base';

export async function readProjects(): ServerResponse<Project[]> {
  const res = await secureInstance.get('/projects');
  return res.data;
}
