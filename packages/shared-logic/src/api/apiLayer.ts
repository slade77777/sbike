import {ServerResponse} from '../types/response';
import {Project} from '../types/project';

export interface ApiLayer {
  // project
  readProjects(): ServerResponse<Project[]>;
}
