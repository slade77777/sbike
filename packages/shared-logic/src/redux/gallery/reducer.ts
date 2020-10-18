import {GalleryItem} from '../../types/galleryItem';
import * as actions from './actions';

export type GalleryState = {
  galleries: {
    [collectionName: string]: GalleryItem[] | null;
  };
  loadingGalleries: boolean;
  errorMessage: string | null;
};

const initialState: GalleryState = {
  galleries: {},
  loadingGalleries: false,
  errorMessage: null,
};

export default (
  state: GalleryState = initialState,
  action: actions.ActionType,
) => {
  switch (action.type) {
    // FETCH_PROJECTS
    case actions.GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME: {
      return {...state, loadingGalleries: true};
    }
    case actions.GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME_SUCCESS: {
      return {
        ...state,
        loadingGalleries: false,
        galleries: {
          ...state.galleries,
          [action.payload.collectionName]: action.payload.galleries,
        },
        error: '',
      };
    }
    case actions.GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME_FAILURE: {
      return {...state, loadingGalleries: false, error: 'error'};
    }
    default:
      return state;
  }
};
