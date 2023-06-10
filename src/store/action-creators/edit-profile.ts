import { Dispatch } from 'redux';

import { EditProfileAction, EditProfileActionTypes } from '../../types/edit-profile';
import { blogService } from '../../services/functions';
import { UserPut } from '../../components/edit-profile-form';

export const fetchEditProfile = (userPut: UserPut) => {
  return async (dispatch: Dispatch<EditProfileAction>) => {
    try {
      dispatch({ type: EditProfileActionTypes.FETCH_EDIT_PROFILE });

      const { user, errors } = await blogService.putEditProfile(userPut);

      dispatch({
        type: EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS,
        payload: {
          user,
          errors,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        dispatch({
          type: EditProfileActionTypes.FETCH_EDIT_PROFILE_ERROR,
          payload: { clientError: e.message },
        });
      }

      throw e;
    }
  };
};

export const setIsUpdatedToDefault = () => {
  return (dispatch: Dispatch<EditProfileAction>) => {
    dispatch({
      type: EditProfileActionTypes.SET_IS_UPDATED_TO_DEFAULT,
      payload: false,
    });
  };
};
