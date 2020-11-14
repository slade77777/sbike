export const PERMISSION_UPDATE_PERMISSION = 'AJFOEKCNFO9383'; // Quyền phân quyền cho người dùng
export const PERMISSION_UPDATE_USER = 'ODKDJF0393'; // Quyền update người dùng
export const PERMISSION_UPDATE_COMPANY = 'CNCDDW1010293'; // Quyền cập nhật công ty
export const PERMISSION_MANAGER_USER = 'IDdi4$%949'; // Quyền quản lý người dùng trong công ty
export const PERMISSION_GET_ALL_COMPANY = '092KDcjdc02'; // Quyền lấy danh sách tất cả các công ty

export type Role = {
  name: string;
  label: string;
};

export const ROLES: Role[] = [
  {
    name: PERMISSION_UPDATE_PERMISSION,
    label: 'Phân quyền cho người dùng',
  },
  {
    name: PERMISSION_UPDATE_USER,
    label: 'Cập nhật người dùng',
  },
  {
    name: PERMISSION_UPDATE_COMPANY,
    label: 'Cập nhật công ty',
  },
  {
    name: PERMISSION_MANAGER_USER,
    label: 'Quản lý người dùng trong công ty',
  },
  {
    name: PERMISSION_GET_ALL_COMPANY,
    label: 'Lấy danh sách tất cả các công ty',
  },
];

export function getRoleNameByValue(role: string) {
  if (!role) {
    return '';
  }
  return ROLES.find((r) => r.name === role)?.label;
}
