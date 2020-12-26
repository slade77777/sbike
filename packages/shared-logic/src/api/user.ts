import {ServerResponse} from '../types/response';
import {
  UserResponse,
  User,
  UserLogoutResponse,
  AccountAction,
} from '../types/user';

import {secureInstance} from './base';

export function login(params: User): ServerResponse<UserResponse> {
  return secureInstance.post('/user/login', params);
}

export async function createOrUpdateUser({
  params,
  type,
}: {
  params: User;
  type: AccountAction;
}): ServerResponse<{result: boolean; message?: string} | UserResponse> {
  return secureInstance.put(`/user/${type}`, params);
}

export async function logout(token?: string): ServerResponse<UserLogoutResponse> {
  return secureInstance.post('/user/logout', {token});
}

export async function getUserInfo(): ServerResponse<User> {
  return secureInstance.get('/User/Getinfo');
}

export function getUserByCompany(): ServerResponse<User[]> {
  return secureInstance.get('/user/GetUserByCompany');
}
