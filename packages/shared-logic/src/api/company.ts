import {ServerResponse} from '../types/response';
import {Company} from '../types/company';
import {secureInstance} from './base';

export async function getAllCompanies(): ServerResponse<Company[]> {
  return secureInstance.get(`/company/GetAllCompany`);
}

export function getCompanyByCompanyId(
  companyID: string,
): ServerResponse<Company> {
  return secureInstance.get(`/company/GetCompany/${companyID}`);
}

export function getGroupCompany(companyID: string): ServerResponse<Company[]> {
  return secureInstance.get(`/company/GetGroupCompany/${companyID}`);
}

export function createOrUpdateCompany(
  company: Company,
): ServerResponse<Company> {
  return secureInstance.post(`/company/UpdateCompany`, company);
}
