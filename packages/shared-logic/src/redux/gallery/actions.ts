import {Dispatch} from 'redux';
import {GalleryItem} from '../../types/galleryItem';
import {AppThunk} from '../types';
import {HttpCodes} from '../../types/response';
import {api} from '../../api';

export enum GalleryActionType {
  FETCH_GALLERY_BY_COLLECTION_NAME = 'FETCH_GALLERY_BY_COLLECTION_NAME',
  FETCH_GALLERY_BY_COLLECTION_NAME_SUCCESS = 'FETCH_GALLERY_BY_COLLECTION_NAME_SUCCESS',
  FETCH_GALLERY_BY_COLLECTION_NAME_FAILURE = 'FETCH_GALLERY_BY_COLLECTION_NAME_FAILURE',
}

export type ActionType =
  | FetchGalleryByCollectionName
  | FetchGalleryByCollectionNameSuccess
  | FetchGalleryByCollectionNameFailed;

export type FetchGalleryByCollectionName = {
  type: typeof GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME;
};
export type FetchGalleryByCollectionNameSuccess = {
  type: typeof GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME_SUCCESS;
  payload: {
    collectionName: string;
    galleries: GalleryItem[];
  };
};
export type FetchGalleryByCollectionNameFailed = {
  type: typeof GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME_FAILURE;
  payload: {
    error: string;
  };
};

export const fetchGalleryByCollectionName = (
  projectId: string,
  collectionName: string,
): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({type: GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME});

  const {data, code} = await api.readGalleriesByCollectionName(
    projectId,
    collectionName,
  );

  if (code !== HttpCodes.OK) {
    dispatch({
      type: GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: GalleryActionType.FETCH_GALLERY_BY_COLLECTION_NAME_SUCCESS,
      payload: {
        collectionName: collectionName,
        galleries: data,
      },
    });
  }
};
