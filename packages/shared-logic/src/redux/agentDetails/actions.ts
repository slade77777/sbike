import {AppThunk} from '../types';
import {api} from '../../api';
import {Agent} from '../../types/agent';
import {HttpCodes} from '../../types/response';
import {ApiError} from '../../types/apiError';

export enum AgentDetailsActions {
  FETCH_AGENT_DETAILS = 'FETCH_AGENT_DETAILS',
  FETCH_AGENT_DETAILS_SUCCESS = 'FETCH_AGENT_DETAILS_SUCCESS',
  FETCH_AGENT_DETAILS_FAIL = 'FETCH_AGENT_DETAILS_FAIL',
  RESET_AGENT_DETAILS = 'RESET_AGENT_DETAILS',
}

export type AgentDetailsActionType =
  | FetchAgentDetails
  | FetchAgentDetailsSuccess
  | FetchAgentDetailsFailed
  | ResetAgentDetails;

export type FetchAgentDetails = {
  type: typeof AgentDetailsActions.FETCH_AGENT_DETAILS;
};

export type FetchAgentDetailsSuccess = {
  type: typeof AgentDetailsActions.FETCH_AGENT_DETAILS_SUCCESS;
  payload: {
    agent: Agent;
  };
};

export type FetchAgentDetailsFailed = {
  type: typeof AgentDetailsActions.FETCH_AGENT_DETAILS_FAIL;
  payload: {
    error: ApiError;
  };
};

export type ResetAgentDetails = {
  type: typeof AgentDetailsActions.RESET_AGENT_DETAILS;
};

export const resetAgentDetails = (): ResetAgentDetails => ({
  type: AgentDetailsActions.RESET_AGENT_DETAILS,
});

export const fetchAgentDetails = (id: string): AppThunk<void> => async (
  dispatch,
) => {
  dispatch({type: AgentDetailsActions.FETCH_AGENT_DETAILS});
  const {data, code, meta} = await api.readAgentById(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: AgentDetailsActions.FETCH_AGENT_DETAILS_FAIL,
      payload: {error: meta},
    });
  } else {
    dispatch({
      type: AgentDetailsActions.FETCH_AGENT_DETAILS_SUCCESS,
      payload: {
        agent: {
          ...data,
          avatarUrl: data?.avatar_url ?? '',
          address: {
            address: data?.agent_address,
          },
        },
      },
    });
  }
};
