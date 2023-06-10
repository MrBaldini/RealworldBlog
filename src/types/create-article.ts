import { IArticle } from './load-an-article';

export enum CreateArticleActionTypes {
  FETCH_CREATE_ARTICLE = 'FETCH_CREATE_ARTICLE',
  FETCH_CREATE_ARTICLE_SUCCESS = 'FETCH_CREATE_ARTICLE_SUCCESS',
  FETCH_CREATE_ARTICLE_ERROR = 'FETCH_CREATE_ARTICLE_ERROR',
}

export interface IPostArticle {
  article: {
    title: string | null;
    description: string | null;
    body: string | null;
    tagList: string[] | null;
  };
}

export interface CreateArticleState {
  article: IArticle;
  loading: boolean;
  error: string | null;
}

interface CreateArticleAction {
  type: CreateArticleActionTypes.FETCH_CREATE_ARTICLE;
}

interface CreateArticleSuccessAction {
  type: CreateArticleActionTypes.FETCH_CREATE_ARTICLE_SUCCESS;
  payload: {
    article: IArticle;
  };
}

interface CreateArticleErrorAction {
  type: CreateArticleActionTypes.FETCH_CREATE_ARTICLE_ERROR;
  payload: string;
}

export type NewArticleAction = CreateArticleAction | CreateArticleSuccessAction | CreateArticleErrorAction;
