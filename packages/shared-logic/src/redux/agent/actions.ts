import {AppThunk} from '../types';
import {api} from '../../api';
import {Agent} from '../../types/agent';
import {HttpCodes} from '../../types/response';

export enum AgentActions {
  FETCH_AGENTS = 'FETCH_AGENTS',
  FETCH_AGENTS_SUCCESS = 'FETCH_AGENTS_SUCCESS',
  FETCH_AGENTS_FAIL = 'FETCH_AGENTS_FAIL',
  FETCH_ACTIVE_AGENT = 'FETCH_ACTIVE_AGENT',
  FETCH_ACTIVE_AGENT_SUCCESS = 'FETCH_ACTIVE_AGENT_SUCCESS',
  FETCH_ACTIVE_AGENT_FAIL = 'FETCH_ACTIVE_AGENT_FAIL',
}

export type AgentActionType =
  | FetchAgents
  | FetchAgentsSuccess
  | FetchAgentsFailed
  | FetchActiveAgent
  | FetchActiveAgentSuccess
  | FetchActiveAgentFailed;

export type FetchAgents = {
  type: typeof AgentActions.FETCH_AGENTS;
  payload: {
    page: number;
    size: number;
  };
};

export type FetchAgentsSuccess = {
  type: typeof AgentActions.FETCH_AGENTS_SUCCESS;
  payload: {
    agents: Agent[];
    meta: any;
  };
};

export type FetchAgentsFailed = {
  type: typeof AgentActions.FETCH_AGENTS_FAIL;
  payload: {
    error: any;
  };
};

export type FetchActiveAgent = {
  type: typeof AgentActions.FETCH_ACTIVE_AGENT;
};

export type FetchActiveAgentSuccess = {
  type: typeof AgentActions.FETCH_ACTIVE_AGENT_SUCCESS;
  payload: {
    agent: Agent;
  };
};

export type FetchActiveAgentFailed = {
  type: typeof AgentActions.FETCH_ACTIVE_AGENT_FAIL;
  payload: {
    error: any;
  };
};

export const fetchAgents = (
  page: number,
  size: number,
): AppThunk<void> => async (dispatch) => {
  dispatch({type: AgentActions.FETCH_AGENTS});
  const {data, meta, code} = await api.readAgents(page, size);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: AgentActions.FETCH_AGENTS_FAIL,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: AgentActions.FETCH_AGENTS_SUCCESS,
      payload: {
        agents: data,
        meta: meta,
      },
    });
  }
};

export const fetchActiveAgent = (id: string): AppThunk<void> => async (
  dispatch,
) => {
  dispatch({type: AgentActions.FETCH_ACTIVE_AGENT});
  const {data, code} = await api.readAgentById(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: AgentActions.FETCH_ACTIVE_AGENT_FAIL,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: AgentActions.FETCH_ACTIVE_AGENT_SUCCESS,
      payload: {
        agent: data,
      },
    });
  }
};
