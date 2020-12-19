import {useQuery} from 'react-query';
import {getReportList} from '../api/report';

export default function (
  deviceId: string,
  startTime: string,
  endTime: string,
  type: number,
) {
  return useQuery(
    ['report', deviceId, startTime, endTime, type],
    getReportList,
  );
}
