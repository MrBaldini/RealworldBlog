import { ISignUserState, SignAction, SignActionTypes } from '../../types/sign-user';

const initialState: ISignUserState = {
  user: {
    username: null,
    email: null,
    token: null,
    bio: null,
    image: null,
    logOutRender: false,
  },
  errors: {},
  loading: false,
  clientError: null,
};

const signUserReducer = (state = initialState, action: SignAction): ISignUserState => {
  switch (action.type) {
    case SignActionTypes.FETCH_SIGN_USER:
      return { ...state, loading: true };
    case SignActionTypes.FETCH_SIGN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        errors: action.payload.errors,
        loading: false,
      };
    case SignActionTypes.FETCH_SIGN_USER_ERROR:
      return {
        ...state,
        clientError: action.payload.clientError,
        loading: false,
      };
    case SignActionTypes.LOGOUT_USER:
      return {
        ...initialState,
        user: {
          ...initialState.user,
          logOutRender: true,
        },
      };
    default:
      return state;
  }
};

export { signUserReducer };
