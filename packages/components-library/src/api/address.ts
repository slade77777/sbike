import {ServerResponse} from './types';
import {AddressItem} from './../@types/address';
import {secureInstance} from './base';

export async function getProvinces(): ServerResponse<AddressItem[]> {
  const res = await secureInstance.get(`v1/provinces/`);
  return res.data;
}

export async function getDistricts(
  provinceId: string,
): ServerResponse<AddressItem[]> {
  const res = await secureInstance.get(`v1/provinces/${provinceId}/districts/`);
  return res.data;
}

export async function getWards(
  districtId: string,
): ServerResponse<AddressItem[]> {
  const res = await secureInstance.get(`v1/districts/${districtId}/wards/`);
  return res.data;
}
