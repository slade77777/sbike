import {FirebaseAnalytics} from './index';

export enum DefaultEventParam {
  ScreenName = 'screen_name',
  Function = 'function',
  Feature = 'feature',
  Action = 'action',
}

export enum DefaultEventAction {
  Choose = 'choose',
  Update = 'update',
}

export type EventParams = {
  [key: string]: string;
};

export async function logEvent(name: string, params: EventParams) {
  await FirebaseAnalytics.logEvent(name, params);
}
