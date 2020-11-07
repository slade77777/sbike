import {setApi, createApi} from './api';
import {setToken} from './api/base';

import * as dateUtils from './utils/dateUtils';
export {dateUtils};

export * from './types/project';
export * from './types/user';
export * from './types/response';

// TODO should rewrite as a action on reducer ???
//export api call for agent
export * from './api/project';
export * from './api/user';
export * from './constants/roles';
export {setToken};

export function setupBusinessLayer(baseUrl: string) {
  const api = createApi(baseUrl);
  setApi(api);
}
