export interface ArticlesState {
  articles: IArticles[];
  articlesCount: number;
  page: number;
  loading: boolean;
  error: null | string;
}

export interface IAuthor {
  following: boolean;
  image: string;
  username: string;
  bio?: string;
}

export interface IArticles {
  author: IAuthor;
  body?: string;
  createdAt: string;
  description: string;
  favorited?: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt?: string;
}

export enum ArticlesActionTypes {
  FETCH_ARTICLES = 'FETCH_ARTICLES',
  FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
  FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR',
}

interface FetchArticlesAction {
  type: ArticlesActionTypes.FETCH_ARTICLES;
}

interface FetchArticlesSuccessAction {
  type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS;
  payload: {
    articles: IArticles[];
    articlesCount: number;
    page: number;
  };
}

interface FetchArticlesErrorAction {
  type: ArticlesActionTypes.FETCH_ARTICLES_ERROR;
  payload: string;
}

export type ArticlesAction = FetchArticlesAction | FetchArticlesSuccessAction | FetchArticlesErrorAction;
