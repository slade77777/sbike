import {ServerResponse, Property} from './types';
import {secureInstance} from './base';

export async function getApartments(): ServerResponse<Property[]> {
  const res = await secureInstance.get(`v1/apartments?page=0&size=100`);
  return res.data;
}
