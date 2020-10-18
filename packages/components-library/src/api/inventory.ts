import {
  ClusterBlockResponse,
  StackingPlanReponse,
  ClusterBlockRequest,
  ProjectEventResponse,
  PropertyPosition,
  PropertyView,
  ProjectResponse,
} from '../@types/inventory';
import {ServerResponse} from './types';
import {secureInstance} from './base';

export async function getProjectDetail(
  id: number,
): ServerResponse<ProjectResponse> {
  const res = await secureInstance.get(`v1/projects/${id}`);
  return res.data;
}

export async function getBlockDetail(
  id: string,
): ServerResponse<StackingPlanReponse[]> {
  const res = await secureInstance.get(`v1/stacking-plan/blocks/${id}`);
  return res.data;
}

export async function getClusterBlock(
  request: ClusterBlockRequest,
): ServerResponse<ClusterBlockResponse[]> {
  const res = await secureInstance.get(
    `v1/stacking-plan/projects/${request.id}`,
  );
  return res.data;
}

export async function getProjectEvents(
  projectId: number,
): ServerResponse<ProjectEventResponse[]> {
  const res = await secureInstance.get(`/v1/projects/${projectId}/events`);
  return res.data;
}

export async function getProjectEventDetail(
  projectId: number,
  orderId: number,
): ServerResponse<ProjectEventResponse> {
  const res = await secureInstance.get(
    `v1/projects/${projectId}/events/${orderId}`,
  );
  return res.data;
}

export async function getProjectList(): ServerResponse<ProjectResponse[]> {
  const res = await secureInstance.get(`/v1/projects`);
  return res.data;
}

export async function getPropertyViews(): ServerResponse<PropertyView[]> {
  const res = await secureInstance.get(`/v1/property-views`);
  return res.data;
}

export async function getPropertyPositions(): ServerResponse<
  PropertyPosition[]
> {
  const res = await secureInstance.get(`/v1/property-positions`);
  return res.data;
}
