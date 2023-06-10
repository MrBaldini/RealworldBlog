import { IArticle } from './load-an-article';

export interface EditArticleState {
  article: IArticle;
  loading: boolean;
  error: string | null;
}

export interface IPutArticle {
  article: {
    title: string;
    description: string;
    body: string;
  };
}

export enum EditArticleActionTypes {
  FETCH_EDIT_ARTICLE = 'FETCH_EDIT_ARTICLE',
  FETCH_EDIT_ARTICLE_SUCCESS = 'FETCH_EDIT_ARTICLE_SUCCESS',
  FETCH_EDIT_ARTICLE_ERROR = 'FETCH_EDIT_ARTICLE_ERROR',
}

interface EditArticleAction {
  type: EditArticleActionTypes.FETCH_EDIT_ARTICLE;
}

interface EditArticleSuccessAction {
  type: EditArticleActionTypes.FETCH_EDIT_ARTICLE_SUCCESS;
  payload: IArticle;
}

interface EditArticleErrorAction {
  type: EditArticleActionTypes.FETCH_EDIT_ARTICLE_ERROR;
  payload: string;
}

export type UpdateArticleAction = EditArticleAction | EditArticleSuccessAction | EditArticleErrorAction;
