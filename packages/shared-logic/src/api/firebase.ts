import {ServerResponse} from '../types/response';
import {secureInstance} from './base';

export async function registerTopic(companyID: string, token: string) {
  return secureInstance.post(`/alert/fcmRegister`, {companyID, token});
}

export async function registerFCMTopics({
  companyID,
  token,
}: {
  companyID: string;
  token: string;
}): ServerResponse<any> {
  return secureInstance.post(`/alert/fcmRegister`, {companyID, token});
}
