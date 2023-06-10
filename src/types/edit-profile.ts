export enum EditProfileActionTypes {
  FETCH_EDIT_PROFILE = 'FETCH_EDIT_PROFILE',
  FETCH_EDIT_PROFILE_SUCCESS = 'FETCH_EDIT_PROFILE_SUCCESS',
  FETCH_EDIT_PROFILE_ERROR = 'FETCH_EDIT_PROFILE_ERROR',
  SET_IS_UPDATED_TO_DEFAULT = 'FETCH_IS_UPDATED_TO_DEFAULT',
}

export interface IUserEditProfile {
  email?: string | null;
  password?: string | null;
  username?: string | null;
  bio?: string | null;
  image?: string | null;
  token?: string | null;
  updated?: boolean;
}

interface IErrors {
  status?: string;
  message?: string;
  email?: string;
  username?: string;
}

export interface EditProfileState {
  user: IUserEditProfile;
  errors: IErrors;
  clientError: string | null;
  loading: boolean;
}

interface FetchEditProfileAction {
  type: EditProfileActionTypes.FETCH_EDIT_PROFILE;
}

interface FetchEditProfileSuccessAction {
  type: EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS;
  payload: {
    user: IUserEditProfile;
    errors: IErrors;
  };
}

interface FetchEditProfileErrorAction {
  type: EditProfileActionTypes.FETCH_EDIT_PROFILE_ERROR;
  payload: {
    clientError: string | null;
  };
}

interface SetIsUpdatedToDefaultAction {
  type: EditProfileActionTypes.SET_IS_UPDATED_TO_DEFAULT;
  payload: boolean | undefined;
}

export type EditProfileAction =
  | FetchEditProfileAction
  | FetchEditProfileSuccessAction
  | FetchEditProfileErrorAction
  | SetIsUpdatedToDefaultAction;
