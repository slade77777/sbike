import {ServerResponse} from '../types/response';
import {User, UserLogoutResponse, UserResponse} from '../types/user';

export interface ApiLayer {
  // login
  login(params: User): ServerResponse<UserResponse>;
  createOrUpdateUser(
    params: User,
  ): ServerResponse<{
    result: boolean;
    message: string;
  }>;
  logout(): ServerResponse<UserLogoutResponse>;
}
