import {Article, ArticleCategory} from '../../types/article';
import * as actions from './actions';

// It would make sense to readjust this structure in the future, so that it holds a collection of articles in relation to their categories, e.g. a Map/Object
export type ArticleByCategoryState = {
  articles: Article[];
  category: ArticleCategory | null;
  pageNumber: number;
  pageSize: number;
  total: number;
  loading: boolean;
  error: string;
};

const initState: ArticleByCategoryState = {
  articles: [],
  category: null,
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  loading: false,
  error: '',
};

export default (
  state: ArticleByCategoryState = initState,
  action: actions.ArticleByCategoryActionType,
) => {
  switch (action.type) {
    case actions.ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case actions.ArticleByCategoryActions.FETCH_ARTICLE_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        articles: action.payload.article,
        pageNumber: action.payload?.meta?.page,
        pageSize: action.payload?.meta?.size,
        total: action.payload?.meta?.total,
      };
    }
    default:
      return state;
  }
};
