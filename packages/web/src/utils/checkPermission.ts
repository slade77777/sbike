import {
  hasPermission,
  PERMISSION_GET_ALL_COMPANY,
  PERMISSION_MANAGER_USER,
} from 'shared-logic';

export function hasUserPermission(permissions: Array<string>) {
  return hasPermission(PERMISSION_MANAGER_USER, permissions || []);
}

export function hasCompanyPermission(permissions: Array<string>) {
  return hasPermission(PERMISSION_GET_ALL_COMPANY, permissions || []);
}

export function canGetAllCompanies(permissions: Array<string>): boolean {
  return hasPermission(PERMISSION_GET_ALL_COMPANY, permissions || []);
}
