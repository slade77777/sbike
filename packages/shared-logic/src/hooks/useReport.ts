import {useQuery} from 'react-query';
import {getReportList} from '../api/report';
import {AlertEnum} from '../types/report';

export default function (
  deviceId: string,
  startTime: string,
  endTime: string,
  type: number | AlertEnum,
) {
  return useQuery(
    ['report', deviceId, startTime, endTime, type],
    getReportList,
  );
}
