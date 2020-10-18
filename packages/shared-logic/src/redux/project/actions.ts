import {Dispatch} from 'redux';
// import {Project, ErrorMessages} from 'components-library';
import {Project} from '../../types/project';
import {OutsideFacility} from '../../types/outsideFacility';
import {ProjectGallery} from '../../types/projectGallery';
import {Apartment} from '../../types/apartment';
import {ApartmentImage} from '../../types/apartmentImage';
import {AppThunk} from '../types';
import {HttpCodes} from '../../types/response';
import {api} from '../../api';

export enum ProjectActionType {
  FETCH_PROJECTS = 'FETCH_PROJECTS',
  FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE',

  FETCH_ACTIVE_PROJECT = 'FETCH_ACTIVE_PROJECT',
  FETCH_ACTIVE_PROJECT_SUCCESS = 'FETCH_ACTIVE_PROJECT_SUCCESS',
  FETCH_ACTIVE_PROJECT_FAILURE = 'FETCH_ACTIVE_PROJECT_FAILURE',

  FETCH_ACTIVE_PROJECT_OUTSIDE = 'FETCH_ACTIVE_PROJECT_OUTSIDE',
  FETCH_ACTIVE_PROJECT_OUTSIDE_SUCCESS = 'FETCH_ACTIVE_PROJECT_OUTSIDE_SUCCESS',
  FETCH_ACTIVE_PROJECT_OUTSIDE_FAILURE = 'FETCH_ACTIVE_PROJECT_OUTSIDE_FAILURE',

  FETCH_ACTIVE_PROJECT_GALLERIES = 'FETCH_ACTIVE_PROJECT_GALLERIES',
  FETCH_ACTIVE_PROJECT_GALLERIES_SUCCESS = 'FETCH_ACTIVE_PROJECT_GALLERIES_SUCCESS',
  FETCH_ACTIVE_PROJECT_GALLERIES_FAILURE = 'FETCH_ACTIVE_PROJECT_GALLERIES_FAILURE',

  FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS = 'FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS',
  FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_SUCCESS = 'FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_SUCCESS',
  FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_FAILURE = 'FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_FAILURE',

  FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES = 'FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES',
  FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_SUCCESS = 'FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_SUCCESS',
  FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_FAILURE = 'FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_FAILURE',

  FETCH_ACTIVE_PROJECT_ALL_APARTMENTS = 'FETCH_ACTIVE_PROJECT_ALL_APARTMENTS',
  FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_SUCCESS = 'FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_SUCCESS',
  FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_FAILURE = 'FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_FAILURE',
}

export type ActionType =
  | FetchProjects
  | FetchProjectsSuccess
  | FetchProjectsFailed
  | FetchActiveProject
  | FetchActiveProjectSuccess
  | FetchActiveProjectFailed
  | FetchActiveProjectOutside
  | FetchActiveProjectOutsideSuccess
  | FetchActiveProjectOutsideFailed
  | FetchActiveProjectGalleries
  | FetchActiveProjectGalleriesSuccess
  | FetchActiveProjectGalleriesFailed
  | FetchActiveProjectSampleApartments
  | FetchActiveProjectSampleApartmentsSuccess
  | FetchActiveProjectSampleApartmentsFailed
  | FetchActiveProjectSampleApartmentImages
  | FetchActiveProjectSampleApartmentImagesSuccess
  | FetchActiveProjectSampleApartmentImagesFailed
  | FetchActiveProjectAllApartments
  | FetchActiveProjectAllApartmentsSuccess
  | FetchActiveProjectAllApartmentsFailed;

// FetchProjects
export type FetchProjects = {
  type: typeof ProjectActionType.FETCH_PROJECTS;
};
export type FetchProjectsSuccess = {
  type: typeof ProjectActionType.FETCH_PROJECTS_SUCCESS;
  payload: {
    projects: Project[];
  };
};
export type FetchProjectsFailed = {
  type: typeof ProjectActionType.FETCH_PROJECTS_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveProject
export type FetchActiveProject = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT;
};
export type FetchActiveProjectSuccess = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SUCCESS;
  payload: {
    project: Project;
  };
};
export type FetchActiveProjectFailed = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveProjectOutside
export type FetchActiveProjectOutside = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE;
};
export type FetchActiveProjectOutsideSuccess = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE_SUCCESS;
  payload: {
    activeProjectOutside: OutsideFacility[];
  };
};
export type FetchActiveProjectOutsideFailed = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveProjectGalleries
export type FetchActiveProjectGalleries = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES;
};
export type FetchActiveProjectGalleriesSuccess = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES_SUCCESS;
  payload: {
    activeProjectGalleries: ProjectGallery[];
  };
};
export type FetchActiveProjectGalleriesFailed = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveProjectSampleApartments
export type FetchActiveProjectSampleApartments = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS;
};
export type FetchActiveProjectSampleApartmentsSuccess = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_SUCCESS;
  payload: {
    activeProjectSampleApartments: Apartment[];
  };
};
export type FetchActiveProjectSampleApartmentsFailed = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveProjectSampleApartmentImages
export type FetchActiveProjectSampleApartmentImages = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES;
};
export type FetchActiveProjectSampleApartmentImagesSuccess = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_SUCCESS;
  payload: {
    sampleApartmentId: string;
    sampleApartmentImages: ApartmentImage[];
  };
};
export type FetchActiveProjectSampleApartmentImagesFailed = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_FAILURE;
  payload: {
    error: string;
  };
};

// FetchActiveProjectAllApartments
export type FetchActiveProjectAllApartments = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS;
};
export type FetchActiveProjectAllApartmentsSuccess = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_SUCCESS;
  payload: {
    activeProjectAllApartments: Apartment[];
  };
};
export type FetchActiveProjectAllApartmentsFailed = {
  type: typeof ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_FAILURE;
  payload: {
    error: string;
  };
};

export const fetchProjects = (): AppThunk<void> => async (
  dispatch: Dispatch,
) => {
  dispatch({type: ProjectActionType.FETCH_PROJECTS});

  const {data, code} = await api.readProjects();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProjectActionType.FETCH_PROJECTS_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ProjectActionType.FETCH_PROJECTS_SUCCESS,
      payload: {projects: data},
    });
  }
};

export const fetchActiveProject = (id: string): AppThunk<void> => async (
  dispatch,
) => {
  dispatch({type: ProjectActionType.FETCH_ACTIVE_PROJECT});

  const {data, code} = await api.readProject(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_SUCCESS,
      payload: {project: data},
    });
  }
};

export const fetchActiveProjectOutside = (id: string): AppThunk<void> => async (
  dispatch,
) => {
  dispatch({type: ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE});

  const {data, code} = await api.readProjectOutsideFacilities(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_OUTSIDE_SUCCESS,
      payload: {activeProjectOutside: data},
    });
  }
};

export const fetchActiveProjectGalleries = (
  id: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({type: ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES});

  const {data, code} = await api.readProjectGalleries(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_GALLERIES_SUCCESS,
      payload: {activeProjectGalleries: data},
    });
  }
};

export const fetchActiveProjectSampleApartments = (
  id: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({type: ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS});

  const {data, code} = await api.readSampleApartmentsByProjectId(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENTS_SUCCESS,
      payload: {activeProjectSampleApartments: data},
    });
  }
};

export const fetchActiveProjectSampleApartmentImages = (
  sampleApartmentId: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({
    type: ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES,
  });

  const {data, code} = await api.readApartmentImages(sampleApartmentId);

  if (code !== HttpCodes.OK) {
    dispatch({
      type:
        ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type:
        ProjectActionType.FETCH_ACTIVE_PROJECT_SAMPLE_APARTMENT_IMAGES_SUCCESS,
      payload: {
        sampleApartmentId: sampleApartmentId,
        sampleApartmentImages: data,
      },
    });
  }
};

export const fetchActiveProjectAllApartments = (
  projectId: string,
): AppThunk<void> => async (dispatch) => {
  dispatch({
    type: ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS,
  });

  const {data, code} = await api.readAllApartmentsByProjectId(projectId);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ProjectActionType.FETCH_ACTIVE_PROJECT_ALL_APARTMENTS_SUCCESS,
      payload: {
        activeProjectAllApartments: data,
      },
    });
  }
};
