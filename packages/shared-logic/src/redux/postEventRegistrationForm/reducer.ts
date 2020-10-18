import * as actions from './actions';

export type PostEventRegistrationFormState = {
  requestId: string;
  loading: boolean;
  response: any;
  error: string;
};

const initialState: PostEventRegistrationFormState = {
  requestId: '',
  loading: false,
  response: undefined,
  error: '',
};

export default (
  state: PostEventRegistrationFormState = initialState,
  action: actions.PostEventRegistrationFormActionType,
) => {
  switch (action.type) {
    case actions.PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM: {
      return {
        ...state,
        requestId: action.payload.requestId,
        loading: true,
        error: '',
      };
    }
    case actions.PostEventRegistrationFormAction
      .POST_EVENT_REGISTRATION_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        response: action.payload.response,
        error: '',
      };
    }
    case actions.PostEventRegistrationFormAction
      .POST_EVENT_REGISTRATION_FORM_FAILURE: {
      return {...state, loading: false, error: action.payload.error};
    }
    default:
      return state;
  }
};
