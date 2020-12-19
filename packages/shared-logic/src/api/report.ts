import {ServerResponse} from '../types/response';
import {Report} from '..';
import {secureInstance} from './base';

export async function getReportList(
  companyId: string,
  startTime: string,
  endTime: string,
  type: number
): ServerResponse<Array<Report>> {
  return secureInstance.get(`/alert/GetAlert/${companyId}/${startTime}/${endTime}/${type}`);
}