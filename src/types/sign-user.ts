export enum SignActionTypes {
  FETCH_SIGN_USER = 'FETCH_SIGN_USER',
  FETCH_SIGN_USER_SUCCESS = 'FETCH_SIGN_USER_SUCCESS',
  FETCH_SIGN_USER_ERROR = 'FETCH_SIGN_USER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
}

export interface ISignUserState {
  user: IUser;
  errors: IErrors;
  loading: boolean;
  clientError: string | null;
}

export interface IUser {
  email: string | null;
  token: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
  logOutRender?: boolean;
}

export interface IUserPost {
  user: {
    username?: string | null;
    email: string | null;
    password: string | null;
  };
}

export interface IErrors {
  username?: string[];
  email?: string[];
  'email or password'?: string;
}

interface FetchSignAction {
  type: SignActionTypes.FETCH_SIGN_USER;
}

interface FetchSignSuccessAction {
  type: SignActionTypes.FETCH_SIGN_USER_SUCCESS;
  payload: {
    user: IUser;
    errors: IErrors;
  };
}

interface FetchSignErrorAction {
  type: SignActionTypes.FETCH_SIGN_USER_ERROR;
  payload: {
    clientError: string | null;
  };
}

interface LogOutUser {
  type: SignActionTypes.LOGOUT_USER;
}

export type SignAction = FetchSignAction | FetchSignSuccessAction | FetchSignErrorAction | LogOutUser;
