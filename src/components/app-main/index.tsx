import React from 'react';
import cn from 'classnames';

import ListItems from '../list-items';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ArticlesPagination } from '../articles-pagination';

import classes from './app-main.module.scss';

const AppMain = () => {
  const loading = useTypedSelector((state) => state.articles.loading);
  const isLoading = loading ? null : <ArticlesPagination />;

  return (
    <main className={cn(classes.app__main)}>
      <ListItems />
      {isLoading}
      <div className={cn(classes.main__article)}></div>
    </main>
  );
};

export default AppMain;
