export enum FavoriteActionTypes {
  FETCH_FAVORITE_ARTICLE = 'FETCH_FAVORITE_ARTICLE',
  FETCH_FAVORITE_ARTICLE_SUCCESS = 'FETCH_FAVORITE_ARTICLE_SUCCESS',
  FETCH_FAVORITE_ARTICLE_ERROR = 'FETCH_FAVORITE_ARTICLE_ERROR',
}

export interface FavoriteArticleState {
  loading: boolean;
  error: string | null;
}

interface FavoriteArticleAction {
  type: FavoriteActionTypes.FETCH_FAVORITE_ARTICLE;
}

interface FavoriteArticleSuccessAction {
  type: FavoriteActionTypes.FETCH_FAVORITE_ARTICLE_SUCCESS;
}

interface FavoriteArticleErrorAction {
  type: FavoriteActionTypes.FETCH_FAVORITE_ARTICLE_ERROR;
  payload: string;
}

export type LikeArticleAction = FavoriteArticleAction | FavoriteArticleSuccessAction | FavoriteArticleErrorAction;
