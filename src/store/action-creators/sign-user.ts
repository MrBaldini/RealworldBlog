import { Dispatch } from 'redux';

import { IUserPost, SignAction, SignActionTypes } from '../../types/sign-user';
import { blogService, deleteCookie } from '../../services/functions';

export const fetchSignUpUser = (userPost: IUserPost) => {
  return async (dispatch: Dispatch<SignAction>) => {
    try {
      dispatch({ type: SignActionTypes.FETCH_SIGN_USER });

      const { user, errors } = await blogService.postSignUpUser(userPost);

      dispatch({
        type: SignActionTypes.FETCH_SIGN_USER_SUCCESS,
        payload: {
          user,
          errors,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        dispatch({
          type: SignActionTypes.FETCH_SIGN_USER_ERROR,
          payload: { clientError: e.message },
        });
      }

      throw e;
    }
  };
};

export const fetchSignInUser = (userPost: IUserPost) => {
  return async (dispatch: Dispatch<SignAction>) => {
    try {
      dispatch({ type: SignActionTypes.FETCH_SIGN_USER });

      const { user, errors } = await blogService.postSignInUser(userPost);

      dispatch({
        type: SignActionTypes.FETCH_SIGN_USER_SUCCESS,
        payload: {
          user,
          errors,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        dispatch({
          type: SignActionTypes.FETCH_SIGN_USER_ERROR,
          payload: { clientError: e.message },
        });
      }

      throw e;
    }
  };
};

export const logOutUser = () => {
  return async (dispatch: Dispatch<SignAction>) => {
    localStorage.removeItem('blogKataUsername');
    localStorage.removeItem('blogKataImage');
    localStorage.removeItem('blogKataPage');
    localStorage.removeItem('blogKataOffset');
    deleteCookie('kataBlogToken');
    dispatch({ type: SignActionTypes.LOGOUT_USER });
  };
};
