import {useQuery} from 'react-query';
import {getReportList} from '../api/report';
import {ReportType} from '../types/report';

export default function (
  deviceId: string,
  startTime: string,
  endTime: string,
  type: number | ReportType,
) {
  return useQuery(
    ['report', deviceId, startTime, endTime, type],
    getReportList,
  );
}
