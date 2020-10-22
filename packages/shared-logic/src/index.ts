import {setApi, createApi} from './api';

import * as dateUtils from './utils/dateUtils';
export {dateUtils};

export * from './types/project';
export * from './types/user';
export * from './types/response';

// TODO should rewrite as a action on reducer ???
//export api call for agent
export * from './api/project';
export * from './api/user';
export * from './firebase/auth';
export * from './firebase/analytics';

export function setupBusinessLayer(baseUrl: string) {
  const api = createApi(baseUrl);
  setApi(api);
}
