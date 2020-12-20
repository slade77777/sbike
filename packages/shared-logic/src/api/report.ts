import {ServerResponse} from '../types/response';
import {AlertEnum, Report} from '..';
import {secureInstance} from './base';

export async function getReportList(
  deviceID: string,
  startTime: string,
  endTime: string,
  type: number,
): ServerResponse<Array<Report>> {
  return secureInstance.get(
    `/alert/GetAlert/${deviceID}/${startTime}/${endTime}/${type}`,
  );
}

type ReportQuery = {
  deviceID: string;
  startTime: string;
  endTime: string;
  type: AlertEnum;
};
export async function getReports({
  deviceID,
  startTime,
  endTime,
  type,
}: ReportQuery): ServerResponse<Array<Report>> {
  return secureInstance.get(
    `/alert/GetAlert/${deviceID}/${startTime}/${endTime}/${type}`,
  );
}
