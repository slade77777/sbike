import {ServerResponse} from '../types/response';
import {UserResponse, User} from '../types/user';

import {secureInstance} from './base';

export async function login(params: User): ServerResponse<UserResponse> {
  const res = await secureInstance.post('/user/login', params);
  return res.data;
}

export async function insertUser({
  params,
  session,
}: {
  params: User;
  session?: string;
}): ServerResponse<{result: boolean}> {
  const res = await secureInstance.put('/user/insert', params, {
    headers: {
      API_KEY: session,
    },
  });
  return res.data;
}

export async function logout(): ServerResponse<{result: boolean}> {
  const res = await secureInstance.get('/user/logout');
  return res.data;
}
