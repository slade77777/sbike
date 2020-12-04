export enum RoutesEnum {
  Tracking = '/giam-sat',
  Devices = '/thiet-bi',
  Management = '/quan-ly',
  UserManagement = 'nguoi-dung',
  CompaniesManagement = 'cong-ty',
  AlertMovingReport = 'canh-bao-di-chuyen',
  TurnOnOfReport = 'tat-bat-may',
  OverSpeedReport = 'vuot-qua-toc-do',
  InOutSafeZoneReport = 'vao-ra-vung-an-toan',
}

export const ROUTES = {
  [RoutesEnum.Tracking]: {
    route: RoutesEnum.Tracking,
    title: 'Giám sát',
  },
  [RoutesEnum.Devices]: {
    route: RoutesEnum.Devices,
    title: 'Thiết bị',
  },
  [RoutesEnum.UserManagement]: {
    route: RoutesEnum.UserManagement,
    title: 'Quản lý người dùng',
  },
  [RoutesEnum.CompaniesManagement]: {
    route: RoutesEnum.CompaniesManagement,
    title: 'Quản lý công ty',
  },
  [RoutesEnum.AlertMovingReport]: {
    route: RoutesEnum.AlertMovingReport,
    title: 'Cảnh báo di chuyển',
  },
  [RoutesEnum.TurnOnOfReport]: {
    route: RoutesEnum.TurnOnOfReport,
    title: 'Tắt/Bật máy',
  },
  [RoutesEnum.OverSpeedReport]: {
    route: RoutesEnum.OverSpeedReport,
    title: 'Quá tốc độ',
  },
  [RoutesEnum.InOutSafeZoneReport]: {
    route: RoutesEnum.InOutSafeZoneReport,
    title: 'Vào/Ra vùng an toàn',
  },
};
