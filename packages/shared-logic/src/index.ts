import {setApi, createApi} from './api';
import {setToken} from './api/base';

export * from './utils/dateUtils';

export * from './types/project';
export * from './types/user';
export * from './types/response';
export * from './types/device';
export * from './types/report';
export * from './types/company';

// TODO should rewrite as a action on reducer ???
//export api call for agent
export * from './api/project';
export * from './api/user';
export * from './api/location';
export * from './api/device';
export * from './firebase';
export * from './api/report';
export * from './api/firebase';
export * from './constants/roles';
export * from './api/company';
export {default as useUserInfo} from './hooks/useUserInfo';
export {default as useUsersByCompany} from './hooks/useUsersByCompany';
export {default as useDeviceByCompany} from './hooks/useDeviceCompany';
export {default as useDeviceLocation} from './hooks/useDeviceLocation';
export {default as useDeviceId} from './hooks/useDeviceId';
export {default as useReport} from './hooks/useReport';
export {setToken};

export function setupBusinessLayer(baseUrl: string) {
  const api = createApi(baseUrl);
  setApi(api);
}
