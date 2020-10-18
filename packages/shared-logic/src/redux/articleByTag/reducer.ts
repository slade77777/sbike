import {Article, ArticleTag} from '../../types/article';
import * as actions from './actions';

export type ArticleByTagState = {
  articles: Article[];
  tag: ArticleTag | null;
  pageNumber: number;
  pageSize: number;
  total: number;
  loading: boolean;
  error: string;
};

const initState: ArticleByTagState = {
  articles: [],
  tag: null,
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  loading: false,
  error: '',
};

export default (
  state: ArticleByTagState = initState,
  action: actions.ArticleByTagActionType,
) => {
  switch (action.type) {
    case actions.ArticleByTagActions.FETCH_ARTICLE_BY_TAG: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.ArticleByTagActions.FETCH_ARTICLE_BY_TAG_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case actions.ArticleByTagActions.FETCH_ARTICLE_BY_TAG_SUCCESS: {
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
