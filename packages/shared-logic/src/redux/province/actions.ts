import {Dispatch} from 'redux';
import {Province} from '../../types/province';
import {AppThunk} from '../types';
import {api} from '../../api';
import {HttpCodes} from '../../types/response';

export enum ProvinceActions {
  FETCH_PROVINCES = 'FETCH_PROVINCES',
  FETCH_PROVINCES_SUCCESS = 'FETCH_PROVINCES_SUCCESS',
  FETCH_PROVINCES_FAILURE = 'FETCH_PROVINCES_FAILURE',
  FETCH_PROVINCE_DETAILS = 'FETCH_PROVINCE_DETAILS',
  FETCH_PROVINCE_DETAILS_SUCCESS = 'FETCH_PROVINCE_DETAILS_SUCCESS',
  FETCH_PROVINCE_DETAILS_FAILURE = 'FETCH_PROVINCE_DETAILS_FAILURE',
}

export type ProvinceActionType =
  | FetchProvinces
  | FetchProvincesSuccess
  | FetchProvincesFailure
  | FetchProvinceDetails
  | FetchProvinceDetailsSuccess
  | FetchProvinceDetailsFailure;

export type FetchProvinces = {
  type: typeof ProvinceActions.FETCH_PROVINCES;
};

export type FetchProvincesSuccess = {
  type: typeof ProvinceActions.FETCH_PROVINCES_SUCCESS;
  payload: {
    provinces: Province[];
  };
};

export type FetchProvincesFailure = {
  type: typeof ProvinceActions.FETCH_PROVINCES_FAILURE;
  payload: {
    error: any;
  };
};

export type FetchProvinceDetails = {
  type: typeof ProvinceActions.FETCH_PROVINCE_DETAILS;
};

export type FetchProvinceDetailsSuccess = {
  type: typeof ProvinceActions.FETCH_PROVINCE_DETAILS_SUCCESS;
  payload: {
    province: Province;
  };
};

export type FetchProvinceDetailsFailure = {
  type: typeof ProvinceActions.FETCH_PROVINCE_DETAILS_FAILURE;
  payload: {
    error: any;
  };
};

export const fetchProvinces = (): AppThunk<void> => async (
  dispatch: Dispatch,
) => {
  dispatch({type: ProvinceActions.FETCH_PROVINCES});

  const {code, data} = await api.readProvinces();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProvinceActions.FETCH_PROVINCES_FAILURE,
      payload: {error: 'Error fetching provinces'},
    });
  } else {
    dispatch({
      type: ProvinceActions.FETCH_PROVINCES_SUCCESS,
      payload: {provinces: data},
    });
  }
};

export const fetchProvinceDetails = (id: string): AppThunk<void> => async (
  dispatch: Dispatch,
) => {
  dispatch({type: ProvinceActions.FETCH_PROVINCE_DETAILS});

  const {code, data} = await api.readProvinceDetails(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProvinceActions.FETCH_PROVINCE_DETAILS_FAILURE,
      payload: {error: 'Error fetching province details'},
    });
  } else {
    dispatch({
      type: ProvinceActions.FETCH_PROVINCE_DETAILS_SUCCESS,
      payload: {province: data},
    });
  }
};
