import {Address} from './address';
import {Project} from './project';

export interface Agent {
  id: string;
  name: string;
  mobile: string;
  avatar_url: string;
  avatarUrl: string;
  status: string;
  code: string;
  description: string;
  address: Address;
  agent_address: string;
  projects?: Project[];
}
