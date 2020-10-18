import {Dispatch} from 'redux';
import {Article} from '../../types/article';
import {AppThunk} from '../types';
import {HttpCodes} from './../../types/response';
import {api} from './../../api/index';

export enum ArticleByTagActions {
  FETCH_ARTICLE_BY_TAG = 'FETCH_ARTICLE_BY_TAG',
  FETCH_ARTICLE_BY_TAG_SUCCESS = 'FETCH_ARTICLE_BY_TAG_SUCCESS',
  FETCH_ARTICLE_BY_TAG_FAIL = 'FETCH_ARTICLE_BY_TAG_FAIL',
}

export type ArticleByTagActionType =
  | FetchArticleByTag
  | FetchArticleByTagSuccess
  | FetchArticleByTagFailed;

export type FetchArticleByTag = {
  type: typeof ArticleByTagActions.FETCH_ARTICLE_BY_TAG;
};

export type FetchArticleByTagSuccess = {
  type: typeof ArticleByTagActions.FETCH_ARTICLE_BY_TAG_SUCCESS;
  payload: {
    article: Article[];
    meta: any;
  };
};

export type FetchArticleByTagFailed = {
  type: typeof ArticleByTagActions.FETCH_ARTICLE_BY_TAG_FAIL;
  payload: {
    error: any;
  };
};

export const fetchArticlesByTag = ({
  tagId,
  page,
  pageSize,
}: {
  tagId: string;
  page: number;
  pageSize: number;
}): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: ArticleByTagActions.FETCH_ARTICLE_BY_TAG,
  });
  const {data, code, meta} = await api.readArticlesByListTag({
    tagCodes: [tagId],
    page,
    pageSize,
  });
  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleByTagActions.FETCH_ARTICLE_BY_TAG_FAIL,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleByTagActions.FETCH_ARTICLE_BY_TAG_SUCCESS,
      payload: {article: data, meta},
    });
  }
};
