export type Report = {
  type: string;
  time: string;
  message: string;
  position: {
    deviceId: string;
    alarmState: string;
    status: number;
    latitude: number;
    longitude: number;
    speed: number;
    direction: number;
    deviceTime: string;
    serverTime: string;
    csq: number;
    satellite: number;
    batteryVoltage: number;
    ioStatus: number;
    extendStatus: number;
  };
};

export enum ReportType {
  MOVING = 0,
  ENGINE = 1,
  SPEED = 2,
  ZONE = 3,
}
