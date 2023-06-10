import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Item from '../item';
import { ArticleBtns } from '../article-btns';
import { Spinner } from '../spinner';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useAuth } from '../../hooks/useAuth';
import { bodyToValid } from '../../services/functions';
import classes from './article.module.scss';

export interface Slug {
  slug: string | undefined;
}

const Article = ({ slug }: Slug) => {
  const article = useTypedSelector((state) => state.anArticle.article);
  const loading = useTypedSelector((state) => state.anArticle.loading);
  const { fetchAnArticle } = useActions();
  const { newUser } = useAuth();
  const { author } = article;
  const isUserAuthor = newUser?.username === author.username;

  useEffect(() => {
    fetchAnArticle(slug);
  }, []);

  if (loading) return <Spinner />;
  const isAuthBtns = isUserAuthor ? <ArticleBtns slug={slug} /> : null;

  return (
    <ul className={classes['main__list-items']}>
      <li className={classes['list-items__item']}>
        <Item
          slug={article.slug}
          author={article.author}
          createdAt={article.createdAt}
          description={article.description}
          tagList={article.tagList}
          title={article.title}
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
        />
        {isAuthBtns}
        <ReactMarkdown className={classes.item__markdown}>{bodyToValid(article.body)}</ReactMarkdown>
      </li>
    </ul>
  );
};

export default Article;
