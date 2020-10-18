import {ContactFormType} from '../../types/contactFormType';
import * as actions from './actions';

export type PostContactFormState = {
  userInformation: ContactFormType;
  requestId: string;
  loading: boolean;
  response: any;
  error: '';
};

const initialState: PostContactFormState = {
  userInformation: {} as ContactFormType,
  requestId: '',
  loading: false,
  response: undefined,
  error: '',
};

export default (
  state: PostContactFormState = initialState,
  action: actions.PostContactFormActionType,
) => {
  switch (action.type) {
    case actions.PostContactFormAction.USER_INFORMATION: {
      return {...state, userInformation: action.payload.form};
    }
    case actions.PostContactFormAction.POST_CONTACT_FORM: {
      return {...state, requestId: action.payload.requestId, loading: true};
    }
    case actions.PostContactFormAction.POST_CONTACT_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        response: action.payload.response,
        error: '',
      };
    }
    case actions.PostContactFormAction.POST_CONTACT_FORM_FAILURE: {
      return {...state, loading: false, error: 'error'};
    }
    default:
      return state;
  }
};
