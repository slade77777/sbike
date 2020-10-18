import {Dispatch} from 'redux';
import {ContactFormType} from '../../types/contactFormType';
import {AppThunk} from '../types';
import {HttpCodes} from '../../types/response';
import {api} from '../../api';

export enum PostPropertySaleFormAction {
  POST_PROPERTY_SALE_FORM = 'POST_PROPERTY_SALE_FORM',
  POST_PROPERTY_SALE_FORM_SUCCESS = 'POST_PROPERTY_SALE_FORM_SUCCESS',
  POST_PROPERTY_SALE_FORM_FAILURE = 'POST_PROPERTY_SALE_FORM_FAILURE',
}

export type PostPropertySaleFormActionType =
  | PostPropertySaleForm
  | PostPropertySaleFormSuccess
  | PostPropertySaleFormFailure;

export type PostPropertySaleForm = {
  type: typeof PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM;
  payload: {
    requestId?: string;
  };
};
export type PostPropertySaleFormSuccess = {
  type: typeof PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM_SUCCESS;
  payload: {
    response: any;
  };
};
export type PostPropertySaleFormFailure = {
  type: typeof PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM_FAILURE;
  payload: {
    error: string;
  };
};

export const postPropertySaleForm = (
  form: ContactFormType,
  requestId?: string,
): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM,
    payload: {requestId},
  });

  const {data, code} = await api.sendContactForm(form);
  if (code !== HttpCodes.CREATED) {
    dispatch({
      type: PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM_FAILURE,
      payload: {error: 'Error processing the request'},
    });
  } else {
    dispatch({
      type: PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM_SUCCESS,
      payload: {response: data},
    });
  }
};
