import {ServerResponse} from '../types/response';
import {
  UserResponse,
  User,
  UserLogoutResponse,
  AccountAction,
} from '../types/user';

import {secureInstance} from './base';

export async function login(params: User): ServerResponse<UserResponse> {
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

export async function logout(): ServerResponse<UserLogoutResponse> {
  return secureInstance.get('/user/logout');
}

export async function getUserInfo(): ServerResponse<User> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          code: 200,
          data: {
            notificationMessage: '',
            userName: 'dungho',
            fullName: ' HO DUNG',
            active: false,
            companyID: '',
            permission: [''],
            phoneNumber: '999',
            password: '1243',
          },
          status: 200,
        }),
      1000,
    ),
  );
}
