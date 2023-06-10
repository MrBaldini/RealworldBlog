import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import classes from './auth-panel-denied.module.scss';

const AuthPanelDenied = () => {
  return (
    <div className={cn(classes['header__auth-btns'])}>
      <Link to="/sign-in">
        <button className={cn(classes['auth-btns__sign-in'])}>Sign In</button>
      </Link>
      <Link to="/sign-up">
        <button className={cn(classes['auth-btns__sign-up'])}>Sign Up</button>
      </Link>
    </div>
  );
};

export default AuthPanelDenied;
