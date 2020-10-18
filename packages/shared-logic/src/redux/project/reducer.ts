import {Project} from '../../types/project';
import {OutsideFacility} from '../../types/outsideFacility';
import {ProjectGallery} from '../../types/projectGallery';
import {Apartment} from '../../types/apartment';
import {ApartmentImage} from '../../types/apartmentImage';
import * as actions from './actions';

export type ProjectState = {
  projects: Project[]; // list project use for the home page
  activeProject: Project | null;
  activeProjectOutside: OutsideFacility[];
  activeProjectGalleries: ProjectGallery[];
  activeProjectSampleApartments: Apartment[];
  activeProjectSampleApartmentImages: {
    [apartmentId: string]: ApartmentImage[];
  };
  activeProjectAllApartments: Apartment[];
  loadingList: boolean;
  loadingActive: boolean;
  loadingOutside: boolean;
  loadingGalleries: boolean;
  loadingSampleApartments: boolean;
  loadingSampleApartmentImages: boolean;
  loadingAllApartment: boolean;
  errorMessage: string | null;
};

const initialState: ProjectState = {
  projects: [], // list project use for the home page
  activeProject: null,
  activeProjectOutside: [],
  activeProjectGalleries: [],
  activeProjectSampleApartments: [],
  activeProjectSampleApartmentImages: {},
  activeProjectAllApartments: [],
  loadingList: false,
  loadingActive: false,
  loadingOutside: false,
  loadingGalleries: false,
  loadingSampleApartments: false,
  loadingSampleApartmentImages: false,
  loadingAllApartment: false,
  errorMessage: null,
};

export default (
  state: ProjectState = initialState,
  action: actions.ActionType,
) => {
  switch (action.type) {
    // FETCH_PROJECTS
    case actions.ProjectActionType.FETCH_PROJECTS: {
      return {...state, loadingList: true};
    }
    case actions.ProjectActionType.FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        loadingList: false,
        projects: action.payload.projects,
        error: '',
      };
    }
    case actions.ProjectActionType.FETCH_PROJECTS_FAILURE: {
      return {...state, loadingList: false, error: 'error'};
    }

    // FETCH_ACTIVE_PROJECT
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT: {
      return {...state, loadingActive: true};
    }
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_SUCCESS: {
      return {
        ...state,
        loadingActive: false,
        activeProject: action.payload.project,
        error: '',
      };
    }
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_FAILURE: {
      return {...state, loadingActive: false, error: 'error'};
    }

    // FETCH_ACTIVE_PROJECT_OUTSIDE
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE: {
      return {...state, loadingOutside: true};
    }
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE_SUCCESS: {
      return {
        ...state,
        loadingOutside: false,
        activeProjectOutside: action.payload.activeProjectOutside,
        error: '',
      };
    }
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE_FAILURE: {
      return {...state, loadingOutside: false, error: 'error'};
    }

    // FETCH_ACTIVE_PROJECT_GALLERIES
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES: {
      return {...state, loadingGalleries: true};
    }
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES_SUCCESS: {
      return {
        ...state,
        loadingGalleries: false,
        activeProjectGalleries: action.payload.activeProjectGalleries,
        error: '',
      };
    }
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES_FAILURE: {
      return {...state, loadingGalleries: false, error: 'error'};
    }

    // FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS: {
      return {...state, loadingSampleApartments: true};
    }
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_SUCCESS: {
      return {
        ...state,
        loadingSampleApartments: false,
        activeProjectSampleApartments:
          action.payload.activeProjectSampleApartments,
        error: '',
      };
    }
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_FAILURE: {
      return {...state, loadingSampleApartments: false, error: 'error'};
    }

    // FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES: {
      return {...state, loadingSampleApartmentImages: true};
    }
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_SUCCESS: {
      return {
        ...state,
        loadingSampleApartmentImages: false,
        activeProjectSampleApartmentImages: {
          ...state.activeProjectSampleApartmentImages,
          [action.payload.sampleApartmentId]:
            action.payload.sampleApartmentImages,
        },
        error: '',
      };
    }
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_FAILURE: {
      return {...state, loadingSampleApartmentImages: false, error: 'error'};
    }

    // FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS
    case actions.ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS: {
      return {...state, loadingAllApartment: true};
    }
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_SUCCESS: {
      return {
        ...state,
        loadingAllApartment: false,
        activeProjectAllApartments: action.payload.activeProjectAllApartments,
        error: '',
      };
    }
    case actions.ProjectActionType
      .FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_FAILURE: {
      return {...state, loadingAllApartment: false, error: 'error'};
    }

    default:
      return state;
  }
};
