import {secureInstance, transactionMockInstance} from './base';
import {
  Agent,
  Property,
  Facility,
  News,
  Project,
  ProjectImage,
  Promotion,
  ServerResponse,
  SampleApartment,
  ContactFormType,
} from './types';

export async function readProjects(): ServerResponse<Project[]> {
  const res = await transactionMockInstance.get('/projects');
  return res.data;
}

export async function readProject(id: string): ServerResponse<Project> {
  const res = await transactionMockInstance.get(`/projects/${id}`);
  return res.data;
}

export async function readProjectPromotions(
  projectId: string,
): ServerResponse<Promotion[]> {
  const res = await transactionMockInstance.get(
    `/promotions?property_type=project&property_id=${projectId}`,
  );
  return res.data;
}

export async function readProjectImages(
  projectId: string,
): ServerResponse<ProjectImage[]> {
  const res = await transactionMockInstance.get(
    `/images?property_type=project&property_id=${projectId}`,
  );
  return res.data;
}

export async function readProjectNews(
  projectId: string,
): ServerResponse<News[]> {
  const res = await transactionMockInstance.get(
    `/news?property_type=project&property_id=${projectId}`,
  );
  return res.data;
}

export async function readProjectFacilities(
  projectId: string,
): ServerResponse<Facility[]> {
  const res = await transactionMockInstance.get(
    `/facilities_by_project?project_id=${projectId}`,
  );
  return res.data;
}

export async function readProjectApartments(
  projectId: string,
): ServerResponse<Property[]> {
  const res = await transactionMockInstance.get(
    `/sample_apartments?project_id=${projectId}`,
  );
  return res.data;
}

export async function readApartmentDetails(
  apartmentId: string,
): ServerResponse<Property> {
  const res = await transactionMockInstance.get(`/apartments/${apartmentId}`);
  return res.data;
}

export async function readApartmentPromotions(
  apartmentId: string,
): ServerResponse<Promotion[]> {
  const res = await transactionMockInstance.get(
    `/promotions?property_type=apartment&property_id=${apartmentId}`,
  );
  return res.data;
}

export async function readApartmentImages(
  apartmentId: string,
): ServerResponse<ProjectImage[]> {
  const res = await transactionMockInstance.get(
    `/images?property_type=apartment&property_id=${apartmentId}`,
  );
  return res.data;
}

export async function readApartmentFacilities(
  apartmentId: string,
): ServerResponse<Facility[]> {
  const res = await transactionMockInstance.get(
    `/facilities_by_property?property_id=${apartmentId}`,
  );
  return res.data;
}

// Isn't that obsolete?
export async function readApartmentAgents(
  apartmentId: string,
): ServerResponse<Agent[]> {
  const res = await transactionMockInstance.get(
    `/agents?property_type=apartment&&property_id=${apartmentId}`,
  );
  return res.data;
}

export async function readSampleApartments(
  projectId: string,
): ServerResponse<SampleApartment[]> {
  const res = await transactionMockInstance.get(
    `/sample_apartments?project_id=${projectId}`,
  );
  return res.data;
}

export async function readProjectAgents(
  projectId: string,
): ServerResponse<Agent[]> {
  const res = await transactionMockInstance.get(
    `/agents_by_project?project_id=${projectId}`,
  );
  return res.data;
}

export async function readPropertyAgents(
  propertyId: string,
): ServerResponse<Agent[]> {
  const res = await transactionMockInstance.get(
    `/agents_by_property?property_id=${propertyId}`,
  );
  return res.data;
}

export async function sendContactForm(
  form: ContactFormType,
): ServerResponse<Response> {
  const res = await secureInstance.post('/customer-requests', form);
  return res.data;
}

export async function readProperty(id: string): ServerResponse<Property> {
  const res = await transactionMockInstance.get(`/apartments/${id}`);
  return res.data;
}

export async function readProperties(
  projectId?: string,
): ServerResponse<Property[]> {
  const res = await transactionMockInstance.get(
    `/apartments${projectId ? `?project_id=${projectId}` : ''} `,
  );
  return res.data;
}

export async function readAgents(
  page: number = 0,
  size: number = 6,
): ServerResponse<Agent[]> {
  const res = await secureInstance.get(`/agents?page=${page}&size=${size}`);
  return res.data;
}
