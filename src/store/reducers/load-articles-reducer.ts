import { ArticlesState, ArticlesActionTypes, ArticlesAction } from '../../types/load-articles';

const initialState: ArticlesState = {
  articles: [],
  articlesCount: 0,
  page: 1,
  loading: true,
  error: null,
};

export const loadArticlesReducer = (state = initialState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case ArticlesActionTypes.FETCH_ARTICLES:
      return { ...state, articles: [], loading: true, error: null };
    case ArticlesActionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        page: action.payload.page,
        loading: false,
        error: null,
      };
    case ArticlesActionTypes.FETCH_ARTICLES_ERROR:
      return { ...state, articles: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
