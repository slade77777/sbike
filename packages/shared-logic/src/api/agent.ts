import {ServerResponse} from '../types/response';
import {Agent} from '../types/agent';
import {secureInstance} from './base';

export async function readAgents(
  page: number = 0,
  size: number = 6,
): ServerResponse<Agent[]> {
  const res = await secureInstance.get(`/agents?page=${page}&size=${size}`);
  return res.data;
}

export async function readAgentById(agentId: string): ServerResponse<Agent> {
  const res = await secureInstance.get(`/agents/${agentId}`);
  return res.data;
}
