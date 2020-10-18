import {Dispatch} from 'redux';
import {Article} from '../../types/article';
import {AppThunk} from '../types';
import {api} from '../../api';
import {HttpCodes} from './../../types/response';

export enum ArticleByCategoryActions {
  FETCH_ARTICLE_BY_CATEGORY = 'FETCH_ARTICLE_BY_CATEGORY',
  FETCH_ARTICLE_BY_CATEGORY_SUCCESS = 'FETCH_ARTICLE_BY_CATEGORY_SUCCESS',
  FETCH_ARTICLE_BY_CATEGORY_FAIL = 'FETCH_ARTICLE_BY_CATEGORY_FAIL',
}

export type ArticleByCategoryActionType =
  | FetchArticleByCategory
  | FetchArticleByCategorySuccess
  | FetchArticleByCategoryFailed;

export type FetchArticleByCategory = {
  type: typeof ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY;
};

export type FetchArticleByCategorySuccess = {
  type: typeof ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY_SUCCESS;
  payload: {
    article: Article[];
    meta?: any;
  };
};

export type FetchArticleByCategoryFailed = {
  type: typeof ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY_FAIL;
  payload: {
    error: any;
  };
};

export const fetchArticlesByCategory = ({
  categoryId,
  page,
  pageSize,
}: {
  categoryId: string;
  page: number;
  pageSize: number;
}): AppThunk<void> => async (dispatch: Dispatch) => {
  dispatch({
    type: ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY,
  });
  const {data, code, meta} = await api.readArticlesByCategory({
    categoryId,
    page,
    pageSize,
  });
  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY_FAIL,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY_SUCCESS,
      payload: {article: data, meta},
    });
  }
};
