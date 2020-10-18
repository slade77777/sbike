import {Province} from '../../types/province';
import {ProvinceActionType, ProvinceActions} from './actions';

export type ProvinceState = {
  provinces: Province[];
  isLoadingProvinces: boolean;
  isLoadingProvinceDetails: boolean;
  error: string;
};

const initialState: ProvinceState = {
  provinces: [],
  isLoadingProvinces: false,
  isLoadingProvinceDetails: false,
  error: '',
};

export default (
  state: ProvinceState = initialState,
  action: ProvinceActionType,
): ProvinceState => {
  switch (action.type) {
    case ProvinceActions.FETCH_PROVINCES: {
      return {
        ...state,
        isLoadingProvinces: true,
      };
    }
    case ProvinceActions.FETCH_PROVINCES_SUCCESS: {
      return {
        ...state,
        provinces: action.payload.provinces,
        isLoadingProvinces: false,
      };
    }
    case ProvinceActions.FETCH_PROVINCES_FAILURE: {
      return {
        ...state,
        isLoadingProvinces: false,
        error: action.payload.error,
      };
    }
    case ProvinceActions.FETCH_PROVINCE_DETAILS: {
      return {
        ...state,
        isLoadingProvinceDetails: true,
      };
    }
    case ProvinceActions.FETCH_PROVINCE_DETAILS_SUCCESS: {
      const updatedProvinces = state.provinces.length
        ? state.provinces.map((province) =>
            province.id === action.payload.province.id
              ? action.payload.province
              : province,
          )
        : [action.payload.province]; // In an unlikely case the provinces array is empty

      return {
        ...state,
        provinces: updatedProvinces,
        isLoadingProvinceDetails: false,
      };
    }
    case ProvinceActions.FETCH_PROVINCE_DETAILS_FAILURE: {
      return {
        ...state,
        isLoadingProvinceDetails: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};
