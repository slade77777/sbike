import {Dispatch as articleLatestActions} from 'redux';
import {Article} from '../../types/article';
import {AppThunk} from '../types';
import {api} from '../../api';
import {HttpCodes} from '../../types/response';

export enum ArticleLatestActions {
  FETCH_ARTICLE_LATEST = 'FETCH_ARTICLE_LATEST',
  FETCH_ARTICLE_LATEST_SUCCESS = 'FETCH_ARTICLE_LATEST_SUCCESS',
  FETCH_ARTICLE_LATEST_FAILURE = 'FETCH_ARTICLE_LATEST_FAILURE',
}

export type ArticleLatestActionType =
  | FetchArticleLatest
  | FetchArticleLatestSuccess
  | FetchArticleLatestFailed;

export type FetchArticleLatest = {
  type: typeof ArticleLatestActions.FETCH_ARTICLE_LATEST;
};

export type FetchArticleLatestSuccess = {
  type: typeof ArticleLatestActions.FETCH_ARTICLE_LATEST_SUCCESS;
  payload: {
    articles: Article[];
    meta: any;
  };
};

export type FetchArticleLatestFailed = {
  type: typeof ArticleLatestActions.FETCH_ARTICLE_LATEST_FAILURE;
  payload: {
    error: any;
  };
};

export const fetchArticleLatest = (page: number = 0): AppThunk<void> => async (
  dispatch: articleLatestActions,
) => {
  dispatch({type: ArticleLatestActions.FETCH_ARTICLE_LATEST});

  const {data, code, meta} = await api.readLatestArticles(page);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleLatestActions.FETCH_ARTICLE_LATEST_FAILURE,
      payload: {error: 'Error fetching latest news'},
    });
  } else {
    dispatch({
      type: ArticleLatestActions.FETCH_ARTICLE_LATEST_SUCCESS,
      payload: {articles: data, meta},
    });
  }
};
