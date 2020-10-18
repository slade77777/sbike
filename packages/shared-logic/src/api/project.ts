import {ServerResponse} from '../types/response';
import {Project} from '../types/project';
import {ProjectGallery} from '../types/projectGallery';
import {OutsideFacility} from '../types/outsideFacility';
import {GalleryItem} from '../types/galleryItem';

import {secureInstance} from './base';

export async function readProjects(): ServerResponse<Project[]> {
  const res = await secureInstance.get('/projects');
  return res.data;
}

export async function readProject(id: string): ServerResponse<Project> {
  const res = await secureInstance.get(`/projects/${id}`);
  return res.data;
}

export async function readProjectGalleries(
  projectId: string,
): ServerResponse<ProjectGallery[]> {
  const res = await secureInstance.get(`/projects/${projectId}/galleries`);
  return res.data;
}

export async function readProjectOutsideFacilities(
  projectId: string,
): ServerResponse<OutsideFacility[]> {
  const res = await secureInstance.get(
    `/projects/${projectId}/outside-facilities`,
  );
  return res.data;
}

export async function readAllApartmentsByProjectId(
  projectId: string,
): ServerResponse<OutsideFacility[]> {
  const res = await secureInstance.get(`/projects/${projectId}/apartments`);
  return res.data;
}

export async function readGalleriesByCollectionName(
  projectId: string,
  collectionName: string,
): ServerResponse<GalleryItem[]> {
  const res = await secureInstance.get(
    `/projects/${projectId}/galleries/${collectionName}`,
  );
  return res.data;
}
