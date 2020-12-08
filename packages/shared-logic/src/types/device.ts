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
};

export type DeviceLocation = {
  alarmState?: number;
  altitude?: number;
  batteryVoltage?: number;
  csq?: string;
  deviceID?: string;
  deviceTime?: string;
  direction?: string;
  extendStatus?: number;
  ioStatus?: number;
  latitude?: number;
  longitude?: number;
  satellite?: number;
  serverTime?: string;
  speed?: number;
  status?: number;
};

export type AlertConfig = {
  alertEngine?: boolean;
  alertMoving?: boolean;
  alertPolygon?: Array<any>;
  alertSpeed?: number;
};
