import {Apartment} from '../../types/apartment';
import {ApartmentImage} from '../../types/apartmentImage';
import {OutsideFacility} from '../../types/outsideFacility';
import {Project} from '../../types/project';
import * as actions from './actions';

export type ApartmentState = {
  apartments: Apartment[];
  activeApartment: Apartment | null;
  activeApartmentImages: ApartmentImage[];
  activeApartmentParentProject: Project | null;
  activeApartmentOutside: OutsideFacility[];
  loadingList: boolean;
  loadingActive: boolean;
  loadingActiveImage: boolean;
  loadingActiveParentProject: boolean;
  loadingActiveOutside: boolean;
  errorMessage: null;
};

const initialState: ApartmentState = {
  apartments: [],
  activeApartment: null,
  activeApartmentImages: [],
  activeApartmentParentProject: null,
  activeApartmentOutside: [],
  loadingList: false,
  loadingActive: false,
  loadingActiveImage: false,
  loadingActiveParentProject: false,
  loadingActiveOutside: false,
  errorMessage: null,
};

export default (
  state: ApartmentState = initialState,
  action: actions.ActionType,
) => {
  switch (action.type) {
    // FETCH_APARTMENTS
    case actions.ApartmentActionType.FETCH_APARTMENTS: {
      return {...state, loadingList: true};
    }
    case actions.ApartmentActionType.FETCH_APARTMENTS_SUCCESS: {
      return {
        ...state,
        loadingList: false,
        apartments: action.payload.apartments,
        error: '',
      };
    }
    case actions.ApartmentActionType.FETCH_APARTMENTS_FAILURE: {
      return {...state, loadingList: false, error: 'error'};
    }

    // FETCH_ACTIVE_APARTMENT
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT: {
      return {...state, loadingActive: true};
    }
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_SUCCESS: {
      return {
        ...state,
        loadingActive: false,
        activeApartment: action.payload.activeApartment,
        error: '',
      };
    }
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_FAILURE: {
      return {...state, loadingActive: false, error: 'error'};
    }

    // FETCH_ACTIVE_APARTMENT_IMAGES
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES: {
      return {...state, loadingActiveImage: true};
    }
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES_SUCCESS: {
      return {
        ...state,
        loadingActiveImage: false,
        activeApartmentImages: action.payload.activeApartmentImages,
        error: '',
      };
    }
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_IMAGES_FAILURE: {
      return {...state, loadingActiveImage: false, error: 'error'};
    }

    // FETCH_ACTIVE_APARTMENT_PARENT_PROJECT
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_PARENT_PROJECT: {
      return {...state, loadingActiveParentProject: true};
    }
    case actions.ApartmentActionType
      .FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_SUCCESS: {
      return {
        ...state,
        loadingActiveParentProject: false,
        activeApartmentParentProject:
          action.payload.activeApartmentParentProject,
        error: '',
      };
    }
    case actions.ApartmentActionType
      .FETCH_ACTIVE_APARTMENT_PARENT_PROJECT_FAILURE: {
      return {...state, loadingActiveParentProject: false, error: 'error'};
    }

    // FETCH_ACTIVE_APARTMENT_OUTSIDE
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE: {
      return {...state, loadingActiveOutside: true};
    }
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE_SUCCESS: {
      return {
        ...state,
        loadingActiveOutside: false,
        activeApartmentOutside: action.payload.activeApartmentOutside,
        error: '',
      };
    }
    case actions.ApartmentActionType.FETCH_ACTIVE_APARTMENT_OUTSIDE_FAILURE: {
      return {...state, loadingActiveOutside: false, error: 'error'};
    }

    default:
      return state;
  }
};
