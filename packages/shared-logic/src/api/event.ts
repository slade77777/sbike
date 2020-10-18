import {ServerResponse} from '../types/response';
import {Event} from '../types/event';
import {secureInstance} from './base';

export async function readEvents(): ServerResponse<Event[]> {
  const res = await secureInstance.get(`/events`);
  return res.data;
}

export async function readEventById(id: string): ServerResponse<Event> {
  const res = await secureInstance.get(`/events/${id}`);
  return res.data;
}

export async function readEventByProjectId(
  projectId: string,
): ServerResponse<Event[]> {
  const res = await secureInstance.get(`/events/${projectId}/projects`);
  return res.data;
}
