import React from 'react';
import cn from 'classnames';
import { Pagination } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import classes from './articles-pagination.module.scss';

const ArticlesPagination = () => {
  const totalArticles = useTypedSelector((state) => state.articles.articlesCount);
  const page = useTypedSelector((state) => state.articles.page);
  const { fetchArticles } = useActions();

  const localStoragePage = localStorage.getItem('blogKataPage');
  const typingLocalStoragePage = localStoragePage ? +localStoragePage : 0;
  const currentPage = !page ? typingLocalStoragePage : page;

  const onChangePage = (e: number) => {
    const offset = e * 5 - 5;
    localStorage.setItem('blogKataOffset', String(offset));
    fetchArticles(offset);
  };

  return (
    <Pagination
      className={cn(classes.main__pagination)}
      current={currentPage}
      defaultCurrent={1}
      total={totalArticles}
      showSizeChanger={false}
      pageSize={5}
      onChange={onChangePage}
    />
  );
};

export { ArticlesPagination };
