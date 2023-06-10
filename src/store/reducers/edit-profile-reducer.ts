import { EditProfileState, EditProfileAction, EditProfileActionTypes } from '../../types/edit-profile';

const initialState: EditProfileState = {
  user: {
    username: null,
    email: null,
    token: null,
    bio: null,
    image: null,
    updated: false,
  },
  errors: {},
  loading: false,
  clientError: null,
};

const editProfileReducer = (state = initialState, action: EditProfileAction): EditProfileState => {
  switch (action.type) {
    case EditProfileActionTypes.FETCH_EDIT_PROFILE:
      return {
        ...state,
        user: { ...initialState.user },
        loading: true,
      };
    case EditProfileActionTypes.FETCH_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        errors: action.payload.errors,
        loading: false,
      };
    case EditProfileActionTypes.FETCH_EDIT_PROFILE_ERROR:
      return {
        ...state,
        clientError: action.payload.clientError,
        loading: false,
      };
    case EditProfileActionTypes.SET_IS_UPDATED_TO_DEFAULT:
      return {
        ...state,
        user: { ...state.user, updated: action.payload },
      };
    default:
      return state;
  }
};

export { editProfileReducer };
