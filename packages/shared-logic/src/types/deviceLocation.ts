export type DeviceLocation = {
  deviceID: string;
  alarmState: string;
  status?: number;
  latitude?: string;
  longitude?: string;
  speed?: number;
  direction?: string;
  deviceTime?: string;
  serverTime?: string;
  csq?: string;
  satellite?: string;
  batteryVoltage?: string;
  ioStatus?: string;
  extendStatus?: string;
};
