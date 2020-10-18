import {ServerResponse} from './types';
import {PurposeItem} from './../@types/purpose';
import {secureInstance} from './base';

export async function getPurposeOfOpportunity(): ServerResponse<PurposeItem[]> {
  const res = await secureInstance.get(`v1/purposes`);
  return res.data;
}
