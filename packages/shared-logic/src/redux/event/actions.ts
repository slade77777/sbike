import {Dispatch} from 'redux';
import {Event} from '../../types/event';
import {AppThunk} from '../types';
import {api} from './../../api/index';
import {HttpCodes} from './../../types/response';

export enum EventActions {
  FETCH_EVENTS = 'FETCH_EVENTS',
  FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS',
  FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE',

  FETCH_EVENT_BY_PROJECT = 'FETCH_EVENT_BY_PROJECT',
  FETCH_EVENT_BY_PROJECT_SUCCESS = 'FETCH_EVENT_BY_PROJECT_SUCCESS',
  FETCH_EVENT_BY_PROJECT_FAILURE = 'FETCH_EVENT_BY_PROJECT_FAILURE',
}

export type EventActionType =
  | FetchEvents
  | FetchEventsSuccess
  | FetchEventsFailure
  | FetchEventByProject
  | FetchEventByProjectSuccess
  | FetchEventByProjectFailure;

// FetchEvents
export type FetchEvents = {
  type: typeof EventActions.FETCH_EVENTS;
};

export type FetchEventsSuccess = {
  type: typeof EventActions.FETCH_EVENTS_SUCCESS;
  payload: {
    events: Event[];
    meta: any;
  };
};

export type FetchEventsFailure = {
  type: typeof EventActions.FETCH_EVENTS_FAILURE;
  payload: {
    error: any;
  };
};

// FetchEventByProject
export type FetchEventByProject = {
  type: typeof EventActions.FETCH_EVENT_BY_PROJECT;
};

export type FetchEventByProjectSuccess = {
  type: typeof EventActions.FETCH_EVENT_BY_PROJECT_SUCCESS;
  payload: {
    projectEvent: Event;
    meta: any;
  };
};

export type FetchEventByProjectFailure = {
  type: typeof EventActions.FETCH_EVENT_BY_PROJECT_FAILURE;
  payload: {
    error: any;
  };
};

export const fetchEvents = (): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: EventActions.FETCH_EVENTS,
  });
  const {data, code, meta} = await api.readEvents();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: EventActions.FETCH_EVENTS_FAILURE,
      payload: {error: 'Error fetching data'},
    });
  } else {
    dispatch({
      type: EventActions.FETCH_EVENTS_SUCCESS,
      payload: {events: data, meta},
    });
  }
};

export const fetchEventByProject = (
  projectId: string,
): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: EventActions.FETCH_EVENT_BY_PROJECT,
  });
  const {data, code, meta} = await api.readEventByProjectId(projectId);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: EventActions.FETCH_EVENT_BY_PROJECT_FAILURE,
      payload: {error: 'Error fetching data'},
    });
  } else {
    dispatch({
      type: EventActions.FETCH_EVENT_BY_PROJECT_SUCCESS,
      payload: {projectEvent: data?.[0], meta},
    });
  }
};
