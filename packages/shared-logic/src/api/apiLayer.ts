import {ServerResponse} from '../types/response';
import {
  AccountAction,
  User,
  UserLogoutResponse,
  UserResponse,
} from '../types/user';

export interface ApiLayer {
  login(params: User): ServerResponse<UserResponse>;
  createOrUpdateUser({
    params,
    type,
  }: {
    params: User;
    type: AccountAction;
  }): ServerResponse<{result: boolean; message?: string} | UserResponse>;
  logout(): ServerResponse<UserLogoutResponse>;
}
