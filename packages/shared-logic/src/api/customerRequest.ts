import {ServerResponse} from '../types/response';
import {ContactFormType} from '../types/contactFormType';
import {secureInstance} from './base';

export async function sendContactForm(
  form: ContactFormType,
): ServerResponse<Response> {
  const res = await secureInstance.post('/customer-requests', form);
  return res.data;
}
