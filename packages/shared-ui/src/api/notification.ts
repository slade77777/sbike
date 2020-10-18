import {NotificationResponse} from '../@types/notification';
import {ServerResponse} from './types';
import {secureInstance} from './base';

export async function getNotification(): ServerResponse<
  NotificationResponse[]
> {
  const res = await secureInstance.get(`v1/notifications`);
  return res.data;
}

export async function markReadNotification(id: number): ServerResponse<any> {
  const res = await secureInstance.put(`v1/notifications/${id}`);
  return res.data;
}
