import {Article, ArticleTag, ArticleCategory} from '../../types/article';
import * as actions from './actions';

export type ArticleState = {
  categories: ArticleCategory[];
  activeArticle: Article | null; // for article details page
  relatingActiveArticles: Article[];
  mostViewedArticles: Article[]; // for the panel most view article
  hotTags: ArticleTag[]; // for the panel hot tag
  featureNews: Article[]; // the the feature news panel
  loadingCategories: boolean;
  loadingActive: boolean;
  loadingRelatingActive: boolean;
  loadingMostView: boolean;
  loadingHotTags: boolean;
  loadingFeatureNews: boolean;
  error: '';
};

const initState: ArticleState = {
  categories: [],
  activeArticle: null,
  relatingActiveArticles: [],
  mostViewedArticles: [],
  hotTags: [],
  featureNews: [],
  loadingCategories: false,
  loadingActive: false,
  loadingRelatingActive: false,
  loadingMostView: false,
  loadingHotTags: false,
  loadingFeatureNews: false,
  error: '',
};

export default (
  state: ArticleState = initState,
  action: actions.ArticleActionType,
) => {
  switch (action.type) {
    // active article
    case actions.ArticleActions.FETCH_ACTIVE_ARTICLE: {
      return {...state, loadingActive: true};
    }
    case actions.ArticleActions.FETCH_ACTIVE_ARTICLE_SUCCESS: {
      return {
        ...state,
        loadingActive: false,
        activeArticle: action.payload.article,
        error: '',
      };
    }
    case actions.ArticleActions.FETCH_ACTIVE_ARTICLE_FAILURE: {
      return {...state, loadingActive: false, error: 'error'};
    }

    // categories
    case actions.ArticleActions.FETCH_ARTICLE_CATEGORIES: {
      return {...state, loadingCategories: true};
    }
    case actions.ArticleActions.FETCH_ARTICLE_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loadingCategories: false,
        categories: action.payload.categories,
        error: '',
      };
    }
    case actions.ArticleActions.FETCH_ARTICLE_CATEGORIES_FAILURE: {
      return {...state, loadingCategories: false, error: 'error'};
    }

    // relating active article
    case actions.ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE: {
      return {...state, loadingRelatingActive: true};
    }
    case actions.ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE_SUCCESS: {
      return {
        ...state,
        loadingRelatingActive: false,
        relatingActiveArticles: action.payload.articles,
        error: '',
      };
    }
    case actions.ArticleActions.FETCH_RELATING_ACTIVE_ARTICLE_FAILURE: {
      return {...state, loadingRelatingActive: false, error: 'error'};
    }

    // hot tags
    case actions.ArticleActions.FETCH_HOT_TAGS: {
      return {...state, loadingHotTags: true};
    }
    case actions.ArticleActions.FETCH_HOT_TAGS_SUCCESS: {
      return {
        ...state,
        loadingHotTags: false,
        hotTags: action.payload.tags,
        error: '',
      };
    }
    case actions.ArticleActions.FETCH_HOT_TAGS_FAILURE: {
      return {...state, loadingHotTags: false, error: 'error'};
    }

    case actions.ArticleActions.TOGGLE_MOST_VIEWED_LOADING: {
      return {
        ...state,
        loadingMostView: !state.loadingMostView,
      };
    }
    case actions.ArticleActions.FETCH_MOST_VIEWED_ARTICLES_SUCCESS: {
      return {
        ...state,
        mostViewedArticles: action.payload,
      };
    }
    case actions.ArticleActions.FETCH_MOST_VIEWED_ARTICLES_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case actions.ArticleActions.TOGGLE_FEATURED_NEW: {
      return {
        ...state,
        loadingFeatureNews: !state.loadingFeatureNews,
      };
    }
    case actions.ArticleActions.FETCH_FEATURED_NEWS_SUCCESS: {
      return {
        ...state,
        featureNews: action.payload,
      };
    }
    case actions.ArticleActions.FETCH_FEATURED_NEWS_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
