import {Gender} from './opportunity';
import {Address} from './address';
export interface AgentInforResponse {
  id: number;
  agent_id?: string;
  name?: string;
  code?: string;
  phone_number?: string;
  dob?: string;
  avatar?: string;
  verification_status?: string;
  status?: string;
  address?: Address;
  email?: string;
  identify_number?: string;
  agent_type?: string;
  create_by?: string;
  update_by?: string;
  create_at?: string;
  update_at?: string;
  gender?: Gender;
  year_of_experience?: number;
  first_login?: boolean;
}

export interface AgentUpdateRequest {
  avatar: string;
  dob: string;
  email: string;
  identify_number: string;
  gender: Gender;
  id: number;
  name: string;
  province_id?: number;
  district_id?: number;
  ward_id?: number;
  street?: string;
  year_of_experience: number;
}
