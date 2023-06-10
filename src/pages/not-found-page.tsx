import React from 'react';
import { Link } from 'react-router-dom';

import classes from './styles.module.scss';

const NotFoundPage = () => {
  return (
    <div className={classes['not-found-page']}>
      Page is not found. Go to
      <Link to="/" className={classes['not-found-page__link']}>
        Home Page
      </Link>
      .
    </div>
  );
};

export { NotFoundPage };
