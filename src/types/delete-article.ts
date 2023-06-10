export enum DeleteArticleActionTypes {
  FETCH_DELETE_ARTICLE = 'FETCH_DELETE_ARTICLE',
  FETCH_DELETE_ARTICLE_SUCCESS = 'FETCH_DELETE_ARTICLE_SUCCESS',
  FETCH_DELETE_ARTICLE_ERROR = 'FETCH_DELETE_ARTICLE_ERROR',
}

export interface DeleteArticleState {
  loading: boolean;
  error: string | null;
}

interface RemoveArticleAction {
  type: DeleteArticleActionTypes.FETCH_DELETE_ARTICLE;
}

interface RemoveArticleSuccessAction {
  type: DeleteArticleActionTypes.FETCH_DELETE_ARTICLE_SUCCESS;
}

interface RemoveArticleErrorAction {
  type: DeleteArticleActionTypes.FETCH_DELETE_ARTICLE_ERROR;
  payload: string;
}

export type DeleteArticleAction = RemoveArticleAction | RemoveArticleSuccessAction | RemoveArticleErrorAction;
