import {Dispatch} from 'redux';
// import {Project, ErrorMessages} from 'components-library';
import {AppThunk} from '../types';
import {api} from '../../api';
import {Apartment} from '../../types/apartment';
import {ApartmentImage} from '../../types/apartmentImage';
import {OutsideFacility} from '../../types/outsideFacility';
import {Project} from '../../types/project';
import {HttpCodes} from '../../types/response';

export enum ApartmentActionType {
  FETCH_APARTMENTS = 'FETCH_APARTMENTS',
  FETCH_APARTMENTS_SUCCESS = 'FETCH_APARTMENTS_SUCCESS',
  FETCH_APARTMENTS_FAILURE = 'FETCH_APARTMENTS_FAILURE',

  FETCH_ACTIVE_APARTMENT = 'FETCH_ACTIVE_APARTMENT',
  FETCH_ACTIVE_APARTMENT_SUCCESS = 'FETCH_ACTIVE_APARTMENT_SUCCESS',
  FETCH_ACTIVE_APARTMENT_FAILURE = 'FETCH_ACTIVE_APARTMENT_FAILURE',

  FETCH_ACTIVE_APARTMENT_IMAGES = 'FETCH_ACTIVE_APARTMENT_IMAGES',
  FETCH_ACTIVE_APARTMENT_IMAGES_SUCCESS = 'FETCH_ACTIVE_APARTMENT_IMAGES_SUCCESS',
  FETCH_ACTIVE_APARTMENT_IMAGES_FAILURE = 'FETCH_ACTIVE_APARTMENT_IMAGES_FAILURE',

  FETCH_ACTIVE_APARTMENT_PARENT_PROJECT = 'FETCH_ACTIVE_APARTMENT_PARENT_PROJECT',
  FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_SUCCESS = 'FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_SUCCESS',
  FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_FAILURE = 'FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_FAILURE',

  FETCH_ACTIVE_APARTMENT_OUTSIDE = 'FETCH_ACTIVE_APARTMENT_OUTSIDE',
  FETCH_ACTIVE_APARTMENT_OUTSIDE_SUCCESS = 'FETCH_ACTIVE_APARTMENT_OUTSIDE_SUCCESS',
  FETCH_ACTIVE_APARTMENT_OUTSIDE_FAILURE = 'FETCH_ACTIVE_APARTMENT_OUTSIDE_FAILURE',
}

export type ActionType =
  | FetchApartments
  | FetchApartmentsSuccess
  | FetchApartmentsFailed
  | FetchActiveApartment
  | FetchActiveApartmentSuccess
  | FetchActiveApartmentFailed
  | FetchActiveApartmentImages
  | FetchActiveApartmentImagesSuccess
  | FetchActiveApartmentImagesFailed
  | FetchActiveApartmentParentProject
  | FetchActiveApartmentParentProjectSuccess
  | FetchActiveApartmentParentProjectFailed
  | FetchActiveApartmentOutside
  | FetchActiveApartmentOutsideSuccess
  | FetchActiveApartmentOutsideFailed;

// FetchApartment
export type FetchApartments = {
  type: typeof ApartmentActionType.FETCH_APARTMENTS;
};
export type FetchApartmentsSuccess = {
  type: typeof ApartmentActionType.FETCH_APARTMENTS_SUCCESS;
  payload: {
    apartments: Apartment[];
  };
};
export type FetchApartmentsFailed = {
  type: typeof ApartmentActionType.FETCH_APARTMENTS_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveApartment
export type FetchActiveApartment = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT;
};
export type FetchActiveApartmentSuccess = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_SUCCESS;
  payload: {
    activeApartment: Apartment;
  };
};
export type FetchActiveApartmentFailed = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveApartmentImages
export type FetchActiveApartmentImages = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES;
};
export type FetchActiveApartmentImagesSuccess = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES_SUCCESS;
  payload: {
    activeApartmentImages: ApartmentImage[];
  };
};
export type FetchActiveApartmentImagesFailed = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveApartmentParentProject
export type FetchActiveApartmentParentProject = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT;
};
export type FetchActiveApartmentParentProjectSuccess = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_SUCCESS;
  payload: {
    activeApartmentParentProject: Project;
  };
};
export type FetchActiveApartmentParentProjectFailed = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveApartmentOutside
export type FetchActiveApartmentOutside = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE;
};
export type FetchActiveApartmentOutsideSuccess = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE_SUCCESS;
  payload: {
    activeApartmentOutside: OutsideFacility[];
  };
};
export type FetchActiveApartmentOutsideFailed = {
  type: typeof ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE_FAILURE;
  payload: {
    error: string;
  };
};

export const fetchApartments = (props?: {
  projectId?: string;
  marketType?: string;
  typeRooms?: string;
  isSample?: boolean;
}): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({type: ApartmentActionType.FETCH_APARTMENTS});

  const {data, code} = await api.readApartments(props);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ApartmentActionType.FETCH_APARTMENTS_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ApartmentActionType.FETCH_APARTMENTS_SUCCESS,
      payload: {apartments: data},
    });
  }
};

export const fetchActiveApartment = (id: string): AppThunk<void> => async (
  dispatch,
) => {
  dispatch({type: ApartmentActionType.FETCH_ACTIVE_APARTMENT});

  const {data, code} = await api.readApartment(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_SUCCESS,
      payload: {activeApartment: data},
    });
  }
};

export const fetchActiveApartmentImages = (
  id: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES});

  const {data, code} = await api.readApartmentImages(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES_SUCCESS,
      payload: {activeApartmentImages: data},
    });
  }
};

export const fetchActiveApartmentParentProject = (
  projectId: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT});

  const {data, code} = await api.readProject(projectId);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_SUCCESS,
      payload: {activeApartmentParentProject: data},
    });
  }
};

export const fetchActiveApartmentOutside = (
  projectId: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE});

  const {data, code} = await api.readProjectOutsideFacilities(projectId);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE_SUCCESS,
      payload: {activeApartmentOutside: data},
    });
  }
};
