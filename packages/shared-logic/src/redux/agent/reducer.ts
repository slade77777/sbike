import {Agent} from '../../types/agent';
import * as actions from './actions';

export type AgentState = {
  activeAgent: Agent | null;
  agents: Agent[];
  selectedAgent: Agent | null;
  loadingActive: boolean;
  loading: boolean;
  page: number;
  size: number;
  total: number;
  error: '';
};

const initState: AgentState = {
  activeAgent: null,
  agents: [],
  selectedAgent: null,
  loadingActive: false,
  loading: false,
  page: 0,
  size: 0,
  total: 0,
  error: '',
};

export default (
  state: AgentState = initState,
  action: actions.AgentActionType,
) => {
  switch (action.type) {
    case actions.AgentActions.FETCH_AGENTS: {
      return {...state, loading: true};
    }
    case actions.AgentActions.FETCH_AGENTS_SUCCESS: {
      const {page, size, total} = action.payload.meta;

      return {
        ...state,
        agents:
          page === 0
            ? action.payload.agents
            : [...state.agents, ...action.payload.agents],
        page,
        size,
        total,
        loading: false,
      };
    }
    case actions.AgentActions.FETCH_AGENTS_FAIL: {
      return {...state, error: action.payload.error, loading: false};
    }
    case actions.AgentActions.FETCH_ACTIVE_AGENT: {
      return {...state, loadingActive: true};
    }
    case actions.AgentActions.FETCH_ACTIVE_AGENT_SUCCESS: {
      return {
        ...state,
        activeAgent: action.payload.agent,
        loadingActive: false,
      };
    }
    case actions.AgentActions.FETCH_ACTIVE_AGENT_FAIL: {
      return {...state, error: 'error', loadingActive: false};
    }
    default:
      return state;
  }
};
