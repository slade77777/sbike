import {Event} from '../../types/event';
import * as actions from './actions';

export type EventState = {
  events: Event[];
  projectEvent: Event | null;
  loadingEvents: boolean;
  loadingProjectEvent: boolean;
  error: string;
};

const initState: EventState = {
  events: [],
  projectEvent: null,
  loadingEvents: false,
  loadingProjectEvent: false,
  error: '',
};

export default (
  state: EventState = initState,
  action: actions.EventActionType,
) => {
  switch (action.type) {
    // FetchEvents
    case actions.EventActions.FETCH_EVENTS: {
      return {
        ...state,
        loadingEvents: true,
      };
    }
    case actions.EventActions.FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        loadingEvents: false,
        events: action.payload.events,
        error: '',
      };
    }
    case actions.EventActions.FETCH_EVENTS_FAILURE: {
      return {
        ...state,
        loadingEvents: false,
        error: action.payload.error,
      };
    }

    // FetchEventByProject
    case actions.EventActions.FETCH_EVENT_BY_PROJECT: {
      return {
        ...state,
        loadingProjectEvent: true,
      };
    }
    case actions.EventActions.FETCH_EVENT_BY_PROJECT_SUCCESS: {
      return {
        ...state,
        loadingProjectEvent: false,
        projectEvent: action.payload.projectEvent,
        error: '',
      };
    }
    case actions.EventActions.FETCH_EVENT_BY_PROJECT_FAILURE: {
      return {
        ...state,
        loadingProjectEvent: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
