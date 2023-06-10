import { DeleteArticleState, DeleteArticleActionTypes, DeleteArticleAction } from '../../types/delete-article';

const initialState: DeleteArticleState = {
  loading: false,
  error: null,
};

const deleteArticleReducer = (state = initialState, action: DeleteArticleAction): DeleteArticleState => {
  switch (action.type) {
    case DeleteArticleActionTypes.FETCH_DELETE_ARTICLE:
      return { ...state, loading: true, error: null };
    case DeleteArticleActionTypes.FETCH_DELETE_ARTICLE_SUCCESS:
      return { ...state, loading: false, error: null };
    case DeleteArticleActionTypes.FETCH_DELETE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { deleteArticleReducer };
