export type User = {
  userName: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  createBy?: string;
  createDate?: string;
  lastLogin?: string;
  companyID?: string;
  permission?: Array<string>;
  active?: boolean;
  notificationMessage?: string;
  userToken?: string;
  originalPassword?: string;
};

export interface UserResponse {
  errorCode: number;
  session: string;
  message?: string;
  user: User;
}

export interface UserLogoutResponse {
  result: string;
  isCompleted?: boolean;
  status?: number;
}

export enum AccountAction {
  INSERT = 'insert',
  UPDATE = 'update',
}
