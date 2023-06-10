import { UnfavoriteArticleState, UnfavoriteActionTypes, UnlikeArticleAction } from '../../types/unfavorite-article';

const initialState: UnfavoriteArticleState = {
  loading: false,
  error: null,
};

const unfavoriteArticleReducer = (state = initialState, action: UnlikeArticleAction): UnfavoriteArticleState => {
  switch (action.type) {
    case UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE:
      return { ...state, loading: true, error: null };
    case UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE_SUCCESS:
      return { ...state, loading: false, error: null };
    case UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { unfavoriteArticleReducer };
