import React, { useEffect } from 'react';
import cn from 'classnames';

import { Spinner } from '../spinner';
import Item from '../item';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import classes from './list-items.module.scss';

const ListItems = () => {
  const { articles, loading } = useTypedSelector((state) => state.articles);
  const { fetchArticles } = useActions();

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <Spinner />;

  const articlesList = articles.map((item) => {
    return (
      <li key={item.slug} className={cn(classes['list-items__item'])}>
        <Item
          slug={item.slug}
          author={item.author}
          createdAt={item.createdAt}
          description={item.description}
          tagList={item.tagList}
          title={item.title}
          favoritesCount={item.favoritesCount}
          favorited={item.favorited}
        />
      </li>
    );
  });

  return <ul className={cn(classes['main__list-items'])}>{articlesList}</ul>;
};

export default ListItems;
