import React from 'react';
import cn from 'classnames';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import avatar from '../item/avatar.svg';

import classes from './auth-panel-granted.module.scss';

const AuthPanelGranted = () => {
  const { newUser, signOut } = useAuth();
  const navigate = useNavigate();
  const fromPage = useLocation();
  const { fetchArticles } = useActions();

  const signUsername = useTypedSelector((state) => state.userData.user.username);
  const editedUsername = useTypedSelector((state) => state.editProfile.user.username);
  const signImage = useTypedSelector((state) => state.userData.user.image);
  const editedImage = useTypedSelector((state) => state.editProfile.user.image);

  const username = !editedUsername ? signUsername : editedUsername;
  const image = !editedImage ? signImage : editedImage;

  const usernameWithStorage = username ? username : newUser?.username;
  const imageWithStorage = image ? image : newUser?.image;
  const isAvatar = imageWithStorage ? imageWithStorage : avatar;

  function onLogOut() {
    signOut(() => navigate(fromPage, { replace: true }));
    fetchArticles();
  }

  return (
    <div className={cn(classes['header__auth-granted'])}>
      <Link to="/new-article" className={cn(classes['auth-granted__create-article'])}>
        Create article
      </Link>
      <div className={cn(classes['auth-granted__div-user'])}>
        <Link to="/profile" className={cn(classes['div-user__name'])}>
          {usernameWithStorage}
        </Link>
        <Link to="/profile">
          <img className={cn(classes['div-user__avatar'])} src={isAvatar} />
        </Link>
      </div>
      <button className={cn(classes['auth-granted__log-out'])} onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default AuthPanelGranted;
