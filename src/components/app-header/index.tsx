import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import AuthPanelDenied from '../auth-panel-denied';
import AuthPanelGranted from '../auth-panel-granted';
import { useAuth } from '../../hooks/useAuth';

import classes from './app-header.module.scss';

const AppHeader = () => {
  const { newUser } = useAuth();

  const authPanel = newUser?.username ? <AuthPanelGranted /> : <AuthPanelDenied />;

  return (
    <header className={cn(classes.app__header)}>
      <Link to="/" className={cn(classes['header__title-blog'])}>
        Realworld Blog
      </Link>
      {authPanel}
    </header>
  );
};

export default AppHeader;
