export type Device = {
  alertConfig?: AlertConfig;
  carNumber?: string;
  cityCode?: string;
  companyID?: string;
  countryCode?: string;
  deviceID?: string;
  deviceType?: string;
  expriedDate?: string;
  factoryID?: string;
  isMoving?: boolean;
  logined?: boolean;
  position?: DeviceLocation;
  terminalString?: string;
  isSettingEngineOn?: boolean;
};

export type DeviceLocation = {
  alarmState?: number;
  altitude?: number;
  batteryVoltage?: number;
  csq?: string;
  deviceID?: string;
  deviceTime?: string;
  direction?: number;
  extendStatus?: number;
  ioStatus?: number;
  latitude: number;
  longitude: number;
  satellite?: number;
  serverTime?: string;
  speed?: number;
  status?: number;
};

export type AlertConfig = {
  alertEngine?: boolean;
  alertMoving?: boolean;
  alertPolygon?: Array<AlertPolygon>;
  alertSpeed?: number;
};

export type AlertPolygon = {
  latitude: number;
  longitude: number;
};

export type LatLng = {
  lat: number;
  lng: number;
  direction?: number;
  time?: any;
  speed?: number;
  batteryVoltage?: number;
  status?: number;
};
