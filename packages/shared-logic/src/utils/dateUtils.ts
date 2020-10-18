import dayjs from 'dayjs';

export function format(
  dateString: string,
  formatPattern: string = 'DD/MM/YYYY',
): string {
  return dayjs(dateString).format(formatPattern);
}
