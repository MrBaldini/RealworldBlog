import { FavoriteArticleState, FavoriteActionTypes, LikeArticleAction } from '../../types/favorite-article';

const initialState: FavoriteArticleState = {
  loading: false,
  error: null,
};

const favoriteArticleReducer = (state = initialState, action: LikeArticleAction): FavoriteArticleState => {
  switch (action.type) {
    case FavoriteActionTypes.FETCH_FAVORITE_ARTICLE:
      return { ...state, loading: true, error: null };
    case FavoriteActionTypes.FETCH_FAVORITE_ARTICLE_SUCCESS:
      return { ...state, loading: false, error: null };
    case FavoriteActionTypes.FETCH_FAVORITE_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { favoriteArticleReducer };
