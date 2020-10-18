import {ServerResponse} from '../types/response';
import {Apartment} from '../types/apartment';
import {secureInstance} from './base';

export async function readApartments(props?: {
  projectId?: string;
  marketType?: string;
  typeRooms?: string;
  isSample?: boolean;
}): ServerResponse<Apartment[]> {
  const conditions = [
    props?.projectId ? `projectId=${props.projectId}` : null,
    props?.marketType ? `marketType=${props.marketType}` : null,
    props?.typeRooms ? `typeRooms=${props.typeRooms}` : null,
    props?.isSample ? `isSample=${props.isSample}` : null,
  ]
    .filter((c) => c !== null)
    .join('&');
  const res = await secureInstance.get(
    `/apartments${conditions ? `?${conditions}` : ''}`,
  );
  return res.data;
}

export async function readApartment(id: string): ServerResponse<Apartment> {
  const res = await secureInstance.get(`/apartments/${id}`);
  return res.data;
}

export async function readApartmentImages(
  id: string,
): ServerResponse<Apartment> {
  const res = await secureInstance.get(`/apartments/${id}/images`);
  return res.data;
}

export async function readSampleApartmentsByProjectId(
  projectId: string,
): ServerResponse<Apartment[]> {
  const res = await secureInstance.get(
    `/apartments?projectId=${projectId}&isSample=true`,
  );
  return res.data;
}
