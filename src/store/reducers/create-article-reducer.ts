import { CreateArticleState, CreateArticleActionTypes, NewArticleAction } from '../../types/create-article';

const initialState: CreateArticleState = {
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
  loading: false,
  error: null,
};

const createArticleReducer = (state = initialState, action: NewArticleAction): CreateArticleState => {
  switch (action.type) {
    case CreateArticleActionTypes.FETCH_CREATE_ARTICLE:
      return { ...state, loading: true, error: null };
    case CreateArticleActionTypes.FETCH_CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: { ...action.payload.article },
        loading: false,
        error: null,
      };
    case CreateArticleActionTypes.FETCH_CREATE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { createArticleReducer };
