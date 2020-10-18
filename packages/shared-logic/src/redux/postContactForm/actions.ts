import {Dispatch} from 'redux';
import {ContactFormType} from '../../types/contactFormType';
import {AppThunk} from '../types';
import {HttpCodes} from '../../types/response';
import {api} from '../../api';

export enum PostContactFormAction {
  USER_INFORMATION = 'USE_INFORMATION',
  POST_CONTACT_FORM = 'POST_CONTACT_FORM',
  POST_CONTACT_FORM_SUCCESS = 'POST_CONTACT_FORM_SUCCESS',
  POST_CONTACT_FORM_FAILURE = 'POST_CONTACT_FORM_FAILURE',
}

export type PostContactFormActionType =
  | UserInformation
  | PostContactForm
  | PostContactFormSuccess
  | PostContactFormFailure;

export type UserInformation = {
  type: typeof PostContactFormAction.USER_INFORMATION;
  payload: {
    form: ContactFormType;
  };
};

export type PostContactForm = {
  type: typeof PostContactFormAction.POST_CONTACT_FORM;
  payload: {
    requestId?: string;
  };
};
export type PostContactFormSuccess = {
  type: typeof PostContactFormAction.POST_CONTACT_FORM_SUCCESS;
  payload: {
    response: any;
  };
};
export type PostContactFormFailure = {
  type: typeof PostContactFormAction.POST_CONTACT_FORM_FAILURE;
  payload: {
    error: string;
  };
};

export const userInformation = (
  form: ContactFormType,
): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({type: PostContactFormAction.USER_INFORMATION, payload: {form}});
};

export const postContactForm = (
  form: ContactFormType,
  requestId?: string,
): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: PostContactFormAction.POST_CONTACT_FORM,
    payload: {requestId},
  });

  const {data, code} = await api.sendContactForm(form);
  if (code !== HttpCodes.CREATED) {
    dispatch({
      type: PostContactFormAction.POST_CONTACT_FORM_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: PostContactFormAction.POST_CONTACT_FORM_SUCCESS,
      payload: {response: data},
    });
  }
};
