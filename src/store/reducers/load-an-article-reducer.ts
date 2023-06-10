import { AnArticleState, AnArticleActionTypes, AnArticleAction } from '../../types/load-an-article';

const initialState: AnArticleState = {
  article: {
    slug: '',
    title: '',
    favoritesCount: 0,
    tagList: [],
    author: {
      following: false,
      image: '',
      username: '',
    },
    createdAt: '',
    description: '',
    body: '',
  },
  loading: true,
  error: null,
};

const loadAnArticleReducer = (state = initialState, action: AnArticleAction): AnArticleState => {
  switch (action.type) {
    case AnArticleActionTypes.FETCH_ARTICLE:
      return { ...state, loading: true, error: null };
    case AnArticleActionTypes.FETCH_ARTICLE_SUCCESS:
      return { ...state, article: { ...action.payload }, loading: false, error: null };
    case AnArticleActionTypes.FETCH_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { loadAnArticleReducer };
