import React, { createContext } from 'react';
import { useActions } from '../hooks/useActions';
import { IUser, IUserPost } from '../types/sign-user';
import { useTypedSelector } from '../hooks/useTypedSelector';

type SignIn = (user: IUserPost, cb: () => void) => void;
type SignUp = (cb: () => void) => void;

interface IAuthContext {
  newUser: IUser | null;
  signIn: SignIn;
  signOut: SignUp;
}

const initialContext = {
  newUser: null,
  signIn: () => null,
  signOut: () => null,
};

export const AuthContext = createContext<IAuthContext>(initialContext);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { fetchSignInUser, logOutUser } = useActions();
  const user = useTypedSelector((state) => state.userData.user);

  const localStorageUser = {
    username: localStorage.getItem('blogKataUsername'),
    image: localStorage.getItem('blogKataImage'),
    bio: null,
    token: null,
    email: null,
  };

  const newUser = !user.username ? localStorageUser : user;

  const signIn = (user: IUserPost, cb: () => void) => {
    fetchSignInUser(user);
    cb();
  };

  const signOut = (cb: () => void) => {
    logOutUser();
    cb();
  };

  const value = { newUser, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
