import { IAuthor } from './load-articles';

export interface IArticle {
  author: IAuthor;
  body: string;
  createdAt: string;
  description: string;
  favorited?: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt?: string;
}

export interface AnArticleState {
  article: IArticle;
  loading: boolean;
  error: string | null;
}

export enum AnArticleActionTypes {
  FETCH_ARTICLE = 'FETCH_ARTICLE',
  FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS',
  FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR',
}

interface FetchAnArticleAction {
  type: AnArticleActionTypes.FETCH_ARTICLE;
}

interface FetchAnArticleSuccessAction {
  type: AnArticleActionTypes.FETCH_ARTICLE_SUCCESS;
  payload: IArticle;
}

interface FetchAnArticleErrorAction {
  type: AnArticleActionTypes.FETCH_ARTICLE_ERROR;
  payload: string;
}

export type AnArticleAction = FetchAnArticleAction | FetchAnArticleSuccessAction | FetchAnArticleErrorAction;
