import {ServerResponse} from '../types/response';
import {UserResponse, User, UserLogoutResponse} from '../types/user';

import {secureInstance} from './base';

export async function login(params: User): ServerResponse<UserResponse> {
  return secureInstance.post('/user/login', params);
}

export async function insertUser(
  params: User,
): ServerResponse<{result: boolean}> {
  return secureInstance.put('/user/insert', params);
}

export async function logout(): ServerResponse<UserLogoutResponse> {
  return secureInstance.get('/user/logout');
}
