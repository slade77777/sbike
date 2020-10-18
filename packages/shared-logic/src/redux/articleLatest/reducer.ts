import {Article} from '../../types/article';
import * as actions from './actions';

export type ArticleLatestState = {
  articles: Article[];
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  total: number;
  error: string;
};

const initState: ArticleLatestState = {
  articles: [],
  pageNumber: 0,
  pageSize: 0,
  loading: false,
  total: 0,
  error: '',
};

export default (
  state: ArticleLatestState = initState,
  action: actions.ArticleLatestActionType,
): ArticleLatestState => {
  switch (action.type) {
    case actions.ArticleLatestActions.FETCH_ARTICLE_LATEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.ArticleLatestActions.FETCH_ARTICLE_LATEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        total: action.payload.meta.total,
        pageNumber: action.payload.meta.page,
        pageSize: action.payload.meta.size,
      };
    }
    case actions.ArticleLatestActions.FETCH_ARTICLE_LATEST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
