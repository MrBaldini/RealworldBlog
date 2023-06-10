export enum UnfavoriteActionTypes {
  FETCH_UNFAVORITE_ARTICLE = 'FETCH_UNFAVORITE_ARTICLE',
  FETCH_UNFAVORITE_ARTICLE_SUCCESS = 'FETCH_UNFAVORITE_ARTICLE_SUCCESS',
  FETCH_UNFAVORITE_ARTICLE_ERROR = 'FETCH_UNFAVORITE_ARTICLE_ERROR',
}

export interface UnfavoriteArticleState {
  loading: boolean;
  error: string | null;
}

interface UnfavoriteArticleAction {
  type: UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE;
}

interface UnfavoriteArticleSuccessAction {
  type: UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE_SUCCESS;
}

interface UnfavoriteArticleErrorAction {
  type: UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE_ERROR;
  payload: string;
}

export type UnlikeArticleAction =
  | UnfavoriteArticleAction
  | UnfavoriteArticleSuccessAction
  | UnfavoriteArticleErrorAction;
