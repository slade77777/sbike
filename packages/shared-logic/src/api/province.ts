import {ServerResponse} from '../types/response';
import {Province} from '../types/province';
import {secureInstance} from './base';

export async function readProvinces(): ServerResponse<Province[]> {
  const res = await secureInstance.get('/provinces');
  return res.data;
}

export async function readProvinceDetails(
  id: string,
): ServerResponse<Province> {
  const res = await secureInstance.get(`/provinces/${id}`);
  return res.data;
}
