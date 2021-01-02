import {
  hasPermission,
  PERMISSION_GET_ALL_COMPANY,
  PERMISSION_MANAGER_USER,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_USER,
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

export function canShowManagementMenu(currentRoles: Array<string>): boolean {
  return (
    [
      PERMISSION_UPDATE_USER,
      PERMISSION_UPDATE_COMPANY,
      PERMISSION_MANAGER_USER,
      PERMISSION_GET_ALL_COMPANY,
    ].filter((role) => currentRoles.includes(role)).length > 0
  );
}

export function checkMatchingPermissions(
  requiredPermissions: Array<string>,
  userPermissions: Array<string>,
) {
  return (
    requiredPermissions.filter((rp) => userPermissions.includes(rp))?.length > 0
  );
}
