export enum Routes {
  Tracking = '/giam-sat',
  Devices = '/danh-sach-thiet-bi',
  UserManagement = '/quan-ly-nguoi-dung',
  CompaniesManagement = '/quan-ly-cong-ty',
  AlertMovingReport = '/canh-bao-di-chuyen',
  TurnOnOfReport = '/tat-bat-may',
  OverSpeedReport = '/vuot-qua-toc-do',
  InOutSafeZoneReport = '/vao-ra-vung-an-toan',
}

export const ROUTES = {
  [Routes.Tracking]: {
    route: Routes.Tracking,
    title: 'Giám sát',
  },
  [Routes.Devices]: {
    route: Routes.Devices,
    title: 'Thiết bị',
  },
  [Routes.UserManagement]: {
    route: Routes.UserManagement,
    title: 'Quản lý người dùng',
  },
  [Routes.CompaniesManagement]: {
    route: Routes.CompaniesManagement,
    title: 'Quản lý công ty',
  },
  [Routes.AlertMovingReport]: {
    route: Routes.AlertMovingReport,
    title: 'Cảnh báo di chuyển',
  },
  [Routes.TurnOnOfReport]: {
    route: Routes.TurnOnOfReport,
    title: 'Tắt/Bật máy',
  },
  [Routes.OverSpeedReport]: {
    route: Routes.OverSpeedReport,
    title: 'Quá tốc độ',
  },
  [Routes.InOutSafeZoneReport]: {
    route: Routes.InOutSafeZoneReport,
    title: 'Vào/Ra vùng an toàn',
  },
};
