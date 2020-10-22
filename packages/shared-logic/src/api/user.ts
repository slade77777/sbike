import {ServerResponse} from '../types/response';
import {UserResponse, User} from '../types/user';

import {secureInstance} from './base';

export async function login(params: User): ServerResponse<UserResponse> {
  const res = await secureInstance.post('/user/login', params);
  return res.data;
}
