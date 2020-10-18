import axios from 'axios';
import {
  OpportunityItem,
  OpportunityUpdateRequest,
  HomeType,
  BudgetLimit,
  JobType,
  SellingPolicy,
  BankType,
  LeadProject,
  PotentialLeadFilterRequest,
  GetOpportunityParamRequest,
  PotentialLeadItem,
} from '../@types/opportunity';
import {
  MissionItem,
  MissionReportRequest,
  MissionUpdateStatusRequest,
} from '../@types/mission';
import {Agent, ServerResponse} from './types';
import {secureInstance} from './base';
import {AgentInforResponse, AgentUpdateRequest} from './../@types/agent';
import {GoogleImageStorage} from './../@types/storage';

export async function readAgents(): ServerResponse<Agent[]> {
  const res = await secureInstance.get(`/agents`);
  return res.data;
}

export async function registerAgent(): ServerResponse<AgentInforResponse> {
  secureInstance.defaults.headers['NEW-AGENT-REGISTRATION'] = true;
  await secureInstance.post(`v1/register`);
  return getAgent();
}

export async function getAgent(): ServerResponse<AgentInforResponse> {
  const res = await secureInstance.get(`v1/me`);
  return res.data;
}

export async function updateAgent(
  editAgent: AgentUpdateRequest,
): ServerResponse<any> {
  const res = await secureInstance.put(`v1/me`, editAgent);
  return res.data;
}

export async function generateUploadUrl(
  imageName: string,
  contentType: string,
): ServerResponse<GoogleImageStorage> {
  const res = await secureInstance.post('/v1/storages/upload', {
    content_type: contentType,
    file_name: imageName,
  });
  return res.data;
}

export async function uploadToCloud(
  putUrl: string,
  data: any,
  contentType: string,
): Promise<any> {
  const res = await axios.put(putUrl, data, {
    headers: {'Content-Type': contentType},
  });
  return res.status;
}

export async function getOpportunityList(
  request?: GetOpportunityParamRequest | null,
): ServerResponse<OpportunityItem[]> {
  const res = await secureInstance.get(`v1/opportunities`, {params: request});
  return res.data;
}

export async function getOpportunityById(
  id: string,
): ServerResponse<OpportunityItem> {
  const res = await secureInstance.get(`v1/opportunities/${id}`);
  return res.data;
}

export async function updateOpportunity(
  request: OpportunityUpdateRequest,
  id: string,
): ServerResponse<OpportunityItem> {
  const res = await secureInstance.put(`v1/opportunities/${id}`, request);
  return res.data;
}

export async function addOpportunity(
  request: OpportunityUpdateRequest,
): ServerResponse<OpportunityItem> {
  const res = await secureInstance.post(`v1/opportunities`, request);
  return res.data;
}

export async function getPotentialLeadList(
  request: PotentialLeadFilterRequest,
): ServerResponse<PotentialLeadItem[]> {
  const res = await secureInstance.get(`v1/potential-leads`, {params: request});
  return res.data;
}
export async function addPotentialLead(
  request: OpportunityUpdateRequest,
): ServerResponse<PotentialLeadItem> {
  const res = await secureInstance.post(`v1/potential-leads`, request);
  return res.data;
}
export async function getPotentialLeadById(
  id: string,
): ServerResponse<PotentialLeadItem> {
  const res = await secureInstance.get(`v1/potential-leads/${id}`);
  return res.data;
}

export async function getMissions(): ServerResponse<MissionItem[]> {
  const res = await secureInstance.get(`v1/agent-missions/`);
  return res.data;
}

export async function getMission(id: string): ServerResponse<MissionItem> {
  const res = await secureInstance.get(`v1/agent-missions/${id}`);
  return res.data;
}

export async function getHomeTypes(): ServerResponse<HomeType[]> {
  const res = await secureInstance.get(`v1/home-types`);
  return res.data;
}

export async function getBudgetLimits(): ServerResponse<BudgetLimit[]> {
  const res = await secureInstance.get(`v1/budget-limits`);
  return res.data;
}

export async function getJobTypes(): ServerResponse<JobType[]> {
  const res = await secureInstance.get(`v1/job-types`);
  return res.data;
}

export async function getSellingPolicies(): ServerResponse<SellingPolicy[]> {
  const res = await secureInstance.get(`v1/selling-policies`);
  return res.data;
}

export async function getProjects(): ServerResponse<LeadProject[]> {
  const res = await secureInstance.get(`v1/projects`);
  return res.data;
}

export async function getBankTypes(): ServerResponse<BankType[]> {
  const res = await secureInstance.get(`v1/banks`);
  return res.data;
}

export async function reportMission(
  missionId: string,
  request: MissionReportRequest,
): ServerResponse<MissionItem> {
  const res = await secureInstance.put(
    `v1/agent-missions/${missionId}/reports`,
    request,
  );
  return res.data;
}

export async function updateMissionStatus(
  missionId: string,
  request: MissionUpdateStatusRequest,
): ServerResponse<MissionItem> {
  const res = await secureInstance.put(
    `v1/agent-missions/${missionId}/status`,
    request,
  );
  return res.data;
}
