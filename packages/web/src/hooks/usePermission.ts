import {useMemo} from 'react';
import {
  PERMISSION_GET_ALL_COMPANY,
  PERMISSION_MANAGER_USER,
  PERMISSION_UPDATE_COMPANY,
  PERMISSION_UPDATE_PERMISSION,
  PERMISSION_UPDATE_USER,
  ROLES_ARR,
} from 'shared-logic';
import {useAuthState} from '../context/auth-context';

function usePermission() {
  const {userInfo} = useAuthState();

  return useMemo<{
    isAdmin: boolean;
    canViewUsers: boolean;
    canEditUser: boolean;
    canEditPermission: boolean;
    canViewCompanies: boolean;
    canEditCompany: boolean;
  }>(() => {
    const isAdmin = ROLES_ARR.every((role) =>
      userInfo?.permission?.includes(role),
    );

    const viewUsersPermission = userInfo?.permission?.includes(
      PERMISSION_MANAGER_USER,
    );
    const editUserPermission = userInfo?.permission?.includes(
      PERMISSION_UPDATE_USER,
    );
    const editOtherPermission = userInfo?.permission?.includes(
      PERMISSION_UPDATE_PERMISSION,
    );
    const viewCompaniesPermission = userInfo?.permission?.includes(
      PERMISSION_GET_ALL_COMPANY,
    );
    const editCompanyPermission = userInfo?.permission?.includes(
      PERMISSION_UPDATE_COMPANY,
    );

    return {
      isAdmin,
      canViewUsers: !!viewUsersPermission || !!editUserPermission,
      canEditUser: !!editUserPermission,
      canEditPermission: !!editOtherPermission,
      canViewCompanies: !!editCompanyPermission || !!viewCompaniesPermission,
      canEditCompany: !!editCompanyPermission,
    };
  }, [userInfo?.permission]);
}

export default usePermission;
