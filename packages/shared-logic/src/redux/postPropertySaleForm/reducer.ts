import * as actions from './actions';

export type PostPropertySaleFormState = {
  requestId: string;
  loading: boolean;
  response: any;
  error: string;
};

const initialState: PostPropertySaleFormState = {
  requestId: '',
  loading: false,
  response: undefined,
  error: '',
};

export default (
  state: PostPropertySaleFormState = initialState,
  action: actions.PostPropertySaleFormActionType,
) => {
  switch (action.type) {
    case actions.PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM: {
      return {
        ...state,
        requestId: action.payload.requestId,
        loading: true,
        error: '',
      };
    }
    case actions.PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        response: action.payload.response,
        error: '',
      };
    }
    case actions.PostPropertySaleFormAction.POST_PROPERTY_SALE_FORM_FAILURE: {
      return {...state, loading: false, error: action.payload.error};
    }
    default:
      return state;
  }
};
