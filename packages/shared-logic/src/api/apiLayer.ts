import {ServerResponse} from '../types/response';
import {User, UserResponse} from '../types/user';

export interface ApiLayer {
  // login
  login(params: User): ServerResponse<UserResponse>;
}
