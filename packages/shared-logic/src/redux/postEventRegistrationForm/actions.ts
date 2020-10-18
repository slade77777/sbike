import {Dispatch} from 'redux';
import {ContactFormType} from '../../types/contactFormType';
import {AppThunk} from '../types';
import {HttpCodes} from '../../types/response';
import {api} from '../../api';

export enum PostEventRegistrationFormAction {
  POST_EVENT_REGISTRATION_FORM = 'POST_EVENT_REGISTRATION_FORM',
  POST_EVENT_REGISTRATION_FORM_SUCCESS = 'POST_EVENT_REGISTRATION_FORM_SUCCESS',
  POST_EVENT_REGISTRATION_FORM_FAILURE = 'POST_EVENT_REGISTRATION_FORM_FAILURE',
}

export type PostEventRegistrationFormActionType =
  | PostEventRegistrationForm
  | PostEventRegistrationFormSuccess
  | PostEventRegistrationFormFailure;

export type PostEventRegistrationForm = {
  type: typeof PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM;
  payload: {
    requestId: string;
  };
};
export type PostEventRegistrationFormSuccess = {
  type: typeof PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM_SUCCESS;
  payload: {
    response: any;
  };
};
export type PostEventRegistrationFormFailure = {
  type: typeof PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM_FAILURE;
  payload: {
    error: string;
  };
};

export const postEventRegistrationForm = (
  form: ContactFormType,
  requestId: string,
): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM,
    payload: {requestId},
  });

  const {data, code} = await api.sendContactForm(form);
  if (code !== HttpCodes.CREATED) {
    dispatch({
      type:
        PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM_FAILURE,
      payload: {error: 'Error processing the request'},
    });
  } else {
    dispatch({
      type:
        PostEventRegistrationFormAction.POST_EVENT_REGISTRATION_FORM_SUCCESS,
      payload: {response: data},
    });
  }
};
