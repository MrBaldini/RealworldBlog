import React, { useState } from 'react';
import cn from 'classnames';

import { useActions } from '../../hooks/useActions';
import { useAuth } from '../../hooks/useAuth';

import like from './like.svg';
import redLike from './redLike.svg';
import classes from './like.module.scss';

interface ILikeProps {
  slug: string | undefined;
  favorited: boolean | undefined;
  favoritesCount: number;
}

const Like = ({ slug, favorited, favoritesCount }: ILikeProps) => {
  const [likeClicked, setLikeClicked] = useState(favorited);
  const [counter, setCounter] = useState(favoritesCount);

  const { fetchFavoriteArticle, fetchUnfavoriteArticle } = useActions();
  const { newUser } = useAuth();
  const username = newUser?.username;

  function onLike() {
    fetchFavoriteArticle(slug);
    setLikeClicked(true);
    setCounter(counter + 1);
  }

  function onDislike() {
    fetchUnfavoriteArticle(slug);
    setLikeClicked(false);
    setCounter(counter - 1);
  }

  function onLikeClick() {
    likeClicked ? onDislike() : onLike();
  }

  const likeColor = likeClicked ? redLike : like;
  const isAuth = !username ? () => null : onLikeClick;
  const isCursor = !username ? '' : classes['like-cursor'];

  return (
    <div className={cn(classes['title__div-likes'])}>
      <img className={cn(classes['div-likes__icon-like'], isCursor)} src={likeColor} onClick={isAuth} />
      <span className={cn(classes['div-likes__counter-likes'])}>{counter}</span>
    </div>
  );
};

export { Like };
