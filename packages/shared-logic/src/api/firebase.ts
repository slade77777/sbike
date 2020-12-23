import {secureInstance} from './base';

export async function registerTopic(companyID: string, token: string) {
  return secureInstance.post(`/alert/fcmRegister`, {companyID, token});
}
