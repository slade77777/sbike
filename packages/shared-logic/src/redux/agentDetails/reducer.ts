import {Agent} from '../../types/agent';
import {ApiError} from '../../types/apiError';
import * as actions from './actions';

export type AgentDetailsState = {
  agent: Agent | null;
  loading: boolean;
  error: ApiError | null;
};

const initState: AgentDetailsState = {
  agent: null,
  loading: true,
  error: null,
};

export default (
  state: AgentDetailsState = initState,
  action: actions.AgentDetailsActionType,
) => {
  switch (action.type) {
    case actions.AgentDetailsActions.FETCH_AGENT_DETAILS: {
      return {...state, loading: true};
    }
    case actions.AgentDetailsActions.FETCH_AGENT_DETAILS_SUCCESS: {
      return {
        ...state,
        agent: action.payload.agent,
        loading: false,
      };
    }
    case actions.AgentDetailsActions.FETCH_AGENT_DETAILS_FAIL: {
      return {...state, error: action.payload.error, loading: false};
    }
    case actions.AgentDetailsActions.RESET_AGENT_DETAILS: {
      return {...state, agent: null, loading: false, error: null};
    }
    default:
      return state;
  }
};
