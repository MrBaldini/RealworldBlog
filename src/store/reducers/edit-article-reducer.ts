import { EditArticleState, EditArticleActionTypes, UpdateArticleAction } from '../../types/edit-article';

const initialState: EditArticleState = {
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

const editArticleReducer = (state = initialState, action: UpdateArticleAction): EditArticleState => {
  switch (action.type) {
    case EditArticleActionTypes.FETCH_EDIT_ARTICLE:
      return { ...state, loading: true, error: null };
    case EditArticleActionTypes.FETCH_EDIT_ARTICLE_SUCCESS:
      return { ...state, article: { ...action.payload }, loading: false, error: null };
    case EditArticleActionTypes.FETCH_EDIT_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { editArticleReducer };
