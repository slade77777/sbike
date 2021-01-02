import dayjs from 'dayjs';

export type Company = {
  companyID: string;
  companyName: string;
  companyManagerID: string;
  createBy?: string;
  updateTime?: dayjs.Dayjs | string | Date;
};
