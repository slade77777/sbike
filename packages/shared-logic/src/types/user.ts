export type User = {
  userName: string;
  password: string;
  phoneNumber?: string;
  createBy?: string;
  createDate?: string;
  lastLogin?: string;
  companyID?: string;
  permission?: Array<string>;
  active?: boolean;
  notificationMessage?: string;
};

export interface UserResponse {
  errorCode: number;
  session: string;
  user: User;
}
