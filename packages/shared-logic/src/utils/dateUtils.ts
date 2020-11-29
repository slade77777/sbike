import dayjs from 'dayjs';

export function format(
  dateString: string | any,
  formatPattern: string = 'DD/MM/YYYY',
): string {
  return dayjs(dateString).format(formatPattern);
}

export const SEARCH_HISTORY_FORMATTED_TIME = 'HHmmssDDMMYY';

export enum SearchType {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  ONE_HOUR_AGO = 'oneHour',
  THIRTY_MINUTES_AGO = 'thirty',
}

export const getTodayRange = (): Array<dayjs.Dayjs> => {
  const start = dayjs().startOf('d');
  const end = dayjs().endOf('d');

  return [start, end];
};

export const getYesterdayRange = (): Array<dayjs.Dayjs> => {
  const todayRange = getTodayRange();
  const startOfYtd = dayjs(todayRange[0]).subtract(1, 'day');
  const endOfYtd = dayjs(todayRange[1]).subtract(1, 'day');
  return [startOfYtd, endOfYtd];
};

export const getOneHourAgoRange = (): Array<dayjs.Dayjs> => {
  const now = dayjs();
  const oneHourAgo = dayjs(now).subtract(1, 'hour');
  return [oneHourAgo, now];
};

export const getThirtyMinutesAgoRange = (): Array<dayjs.Dayjs> => {
  const now = dayjs();
  const oneHourAgo = dayjs(now).subtract(30, 'minute');
  return [oneHourAgo, now];
};

export const formatToSearch = (
  range: Array<dayjs.Dayjs>,
  formatType?: string,
) => {
  return [
    format(range[0], formatType || SEARCH_HISTORY_FORMATTED_TIME),
    format(range[1], formatType || SEARCH_HISTORY_FORMATTED_TIME),
  ];
};

export function getTimeRange(
  type: SearchType,
  formatType?: string,
): {
  original: Array<dayjs.Dayjs>;
  formatted?: Array<string>;
} | null {
  switch (type) {
    case SearchType.TODAY:
      return {
        original: getTodayRange(),
        formatted: formatType
          ? formatToSearch(getTodayRange(), formatType)
          : [],
      };

    case SearchType.YESTERDAY:
      return {
        original: getYesterdayRange(),
        formatted: formatType
          ? formatToSearch(getYesterdayRange(), formatType)
          : [],
      };

    case SearchType.ONE_HOUR_AGO:
      return {
        original: getOneHourAgoRange(),
        formatted: formatType
          ? formatToSearch(getOneHourAgoRange(), formatType)
          : [],
      };

    case SearchType.THIRTY_MINUTES_AGO:
      return {
        original: getThirtyMinutesAgoRange(),
        formatted: formatType
          ? formatToSearch(getThirtyMinutesAgoRange(), formatType)
          : [],
      };

    default:
      return null;
  }
}
