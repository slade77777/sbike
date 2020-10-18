import {Dispatch} from 'redux';
import {Article, ArticleTag, ArticleCategory} from '../../types/article';
import {AppThunk} from '../types';
import {api} from '../../api';
import {HttpCodes} from './../../types/response';

export enum ArticleActions {
  // category
  FETCH_ARTICLE_CATEGORIES = 'FETCH_ARTICLE_CATEGORIES',
  FETCH_ARTICLE_CATEGORIES_SUCCESS = 'FETCH_ARTICLE_CATEGORIES_SUCCESS',
  FETCH_ARTICLE_CATEGORIES_FAILURE = 'FETCH_ARTICLE_CATEGORIES_FAILURE',
  // active article
  FETCH_ACTIVE_ARTICLE = 'FETCH_ACTIVE_ARTICLE',
  FETCH_ACTIVE_ARTICLE_SUCCESS = 'FETCH_ACTIVE_ARTICLE_SUCCESS',
  FETCH_ACTIVE_ARTICLE_FAILURE = 'FETCH_ACTIVE_ARTICLE_FAILURE',
  // relating active article
  FETCH_RELATING_ACTIVE_ARTICLE = 'FETCH_RELATING_ACTIVE_ARTICLE',
  FETCH_RELATING_ACTIVE_ARTICLE_SUCCESS = 'FETCH_RELATING_ACTIVE_ARTICLE_SUCCESS',
  FETCH_RELATING_ACTIVE_ARTICLE_FAILURE = 'FETCH_ACTIVE_RELATING_ARTICLE_FAILURE',
  //Most viewed articles
  FETCH_MOST_VIEWED_ARTICLES = 'FETCH_MOST_VIEWED_ARTICLES',
  FETCH_MOST_VIEWED_ARTICLES_SUCCESS = 'FETCH_MOST_VIEWED_ARTICLES_SUCCESS',
  FETCH_MOST_VIEWED_ARTICLES_ERROR = 'FETCH_MOST_VIEWED_ARTICLES_ERROR',
  TOGGLE_MOST_VIEWED_LOADING = 'TOGGLE_MOST_VIEWED_LOADING',

  // hot tags
  FETCH_HOT_TAGS = 'FETCH_HOT_TAGS',
  FETCH_HOT_TAGS_SUCCESS = 'FETCH_HOT_TAGS_SUCCESS',
  FETCH_HOT_TAGS_FAILURE = 'FETCH_HOT_TAGS_FAILURE',

  //Featured news
  FETCH_FEATURED_NEWS = 'FETCH_FEATURED_NEWS',
  FETCH_FEATURED_NEWS_SUCCESS = 'FETCH_FEATURED_NEWS_SUCCESS',
  FETCH_FEATURED_NEWS_ERROR = 'FETCH_FEATURED_NEWS_ERROR',
  TOGGLE_FEATURED_NEW = 'TOGGLE_FEATURED_NEW',
}

export type ArticleActionType =
  | FetchArticleCategories
  | FetchArticleCategoriesSuccess
  | FetchArticleCategoriesFailure
  | FetchActiveArticle
  | FetchActiveArticleSuccess
  | FetchActiveArticleFailure
  | FetchRelatingActiveArticle
  | FetchRelatingActiveArticleSuccess
  | FetchRelatingActiveArticleFailure
  | FetchHotTags
  | FetchHotTagsSuccess
  | FetchHotTagsFailure
  | ToggleMostViewedLoading
  | FetchMostViewedArticleError
  | FetchMostViewedArticlesSuccess
  | ToggleFeatureNewLoading
  | FetchFeaturedNewSuccess
  | FetchFeatureNewError;

// article categories
export type FetchArticleCategories = {
  type: typeof ArticleActions.FETCH_ARTICLE_CATEGORIES;
};

export type FetchArticleCategoriesSuccess = {
  type: typeof ArticleActions.FETCH_ARTICLE_CATEGORIES_SUCCESS;
  payload: {
    categories: ArticleCategory[];
    meta: any;
  };
};

export type FetchArticleCategoriesFailure = {
  type: typeof ArticleActions.FETCH_ARTICLE_CATEGORIES_FAILURE;
  payload: {
    error: any;
  };
};

// active article
export type FetchActiveArticle = {
  type: typeof ArticleActions.FETCH_ACTIVE_ARTICLE;
};

export type FetchActiveArticleSuccess = {
  type: typeof ArticleActions.FETCH_ACTIVE_ARTICLE_SUCCESS;
  payload: {
    article: Article;
    meta: any;
  };
};

export type FetchActiveArticleFailure = {
  type: typeof ArticleActions.FETCH_ACTIVE_ARTICLE_FAILURE;
  payload: {
    error: any;
  };
};

// FetchRelatingActiveArticle
export type FetchRelatingActiveArticle = {
  type: typeof ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE;
};

export type FetchRelatingActiveArticleSuccess = {
  type: typeof ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE_SUCCESS;
  payload: {
    articles: Article[];
    meta: any;
  };
};

export type FetchRelatingActiveArticleFailure = {
  type: typeof ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE_FAILURE;
  payload: {
    error: any;
  };
};

// FetchHotTags
export type FetchHotTags = {
  type: typeof ArticleActions.FETCH_HOT_TAGS;
};

export type FetchHotTagsSuccess = {
  type: typeof ArticleActions.FETCH_HOT_TAGS_SUCCESS;
  payload: {
    tags: ArticleTag[];
    meta: any;
  };
};

export type FetchHotTagsFailure = {
  type: typeof ArticleActions.FETCH_HOT_TAGS_FAILURE;
  payload: {
    error: any;
  };
};

// todo need to refactor follow the convention
type ToggleMostViewedLoading = {
  type: ArticleActions.TOGGLE_MOST_VIEWED_LOADING;
};

type FetchMostViewedArticleError = {
  type: ArticleActions.FETCH_MOST_VIEWED_ARTICLES_ERROR;
  payload: {error: any};
};

type FetchMostViewedArticlesSuccess = {
  type: ArticleActions.FETCH_MOST_VIEWED_ARTICLES_SUCCESS;
  payload: Article[];
};

type ToggleFeatureNewLoading = {
  type: ArticleActions.TOGGLE_FEATURED_NEW;
};

type FetchFeaturedNewSuccess = {
  type: ArticleActions.FETCH_FEATURED_NEWS_SUCCESS;
  payload: Article[];
};

type FetchFeatureNewError = {
  type: ArticleActions.FETCH_FEATURED_NEWS_ERROR;
  payload: {error: any};
};

export const fetchActiveArticle = (id: string): AppThunk<void> => async (
  dispatch,
) => {
  dispatch({type: ArticleActions.FETCH_ACTIVE_ARTICLE});

  const {data, code} = await api.readArticle(id);

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleActions.FETCH_ACTIVE_ARTICLE_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleActions.FETCH_ACTIVE_ARTICLE_SUCCESS,
      payload: {article: data},
    });
  }
};

export const fetchCategories = (): AppThunk<void> => async (dispatch) => {
  dispatch({type: ArticleActions.FETCH_ARTICLE_CATEGORIES});

  const {data, code} = await api.readArticleCategories();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleActions.FETCH_ARTICLE_CATEGORIES_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleActions.FETCH_ARTICLE_CATEGORIES_SUCCESS,
      payload: {categories: data},
    });
  }
};

export const fetchRelatingActiveArticles = (
  tags: ArticleTag[],
): AppThunk<void> => async (dispatch) => {
  dispatch({type: ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE});

  const tagCodes = tags?.map((t) => t.code);
  const {data, code} = await api.readArticlesByListTag({
    tagCodes,
    page: 0,
    pageSize: 5,
  });

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE_SUCCESS,
      payload: {articles: data},
    });
  }
};

export const fetchHotTags = (): AppThunk<void> => async (dispatch) => {
  dispatch({type: ArticleActions.FETCH_HOT_TAGS});

  const {data, code} = await api.readHotTags();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleActions.FETCH_HOT_TAGS_FAILURE,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleActions.FETCH_HOT_TAGS_SUCCESS,
      payload: {tags: data},
    });
  }
};

const toggleLoading: () => ToggleMostViewedLoading = () => ({
  type: ArticleActions.TOGGLE_MOST_VIEWED_LOADING,
});

export const fetchMostViewedArticles = (): AppThunk<void> => async (
  dispatch: Dispatch,
) => {
  dispatch(toggleLoading());
  const {data, code} = await api.readMostViewedArticles();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleActions.FETCH_MOST_VIEWED_ARTICLES_ERROR,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleActions.FETCH_MOST_VIEWED_ARTICLES_SUCCESS,
      payload: data,
    });
  }
  dispatch(toggleLoading());
};

const toggleFeatureNewLoading: () => ToggleFeatureNewLoading = () => ({
  type: ArticleActions.TOGGLE_FEATURED_NEW,
});

export const fetchFeatureNew = (): AppThunk<void> => async (
  dispatch: Dispatch,
) => {
  dispatch(toggleFeatureNewLoading());
  const {data, code} = await api.readFeatureNews();

  if (code !== HttpCodes.OK) {
    dispatch({
      type: ArticleActions.FETCH_FEATURED_NEWS_ERROR,
      payload: {error: ''},
    });
  } else {
    dispatch({
      type: ArticleActions.FETCH_FEATURED_NEWS_SUCCESS,
      payload: data,
    });
  }
  dispatch(toggleFeatureNewLoading());
};
