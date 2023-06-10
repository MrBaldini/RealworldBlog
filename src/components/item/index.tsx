import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { IArticles } from '../../types/load-articles';
import { Like } from '../like';
import { transformDate, formatDescription, isValidUrl, formatTitle, isTagsValid } from '../../services/functions';
import classes from './item.module.scss';
import defaultAvatar from './avatar.svg';

const Item = ({ slug, author, createdAt, description, tagList, title, favoritesCount, favorited }: IArticles) => {
  const titleArticle = formatTitle(title);
  const formattedDate = transformDate(createdAt);
  const formattedDescription = formatDescription(description);
  const validTagsList = isTagsValid(tagList);

  const imageUrl = author.image;
  const isImageUrl = isValidUrl(imageUrl);
  const avatar = isImageUrl ? imageUrl : defaultAvatar;

  return (
    <>
      <div className={cn(classes.item__header)}>
        <div className={cn(classes['header__div-title-tag'])}>
          <div className={cn(classes['div-title-tag__title'])}>
            <Link className={cn(classes['title__title-article'])} to={`/articles/${slug}`}>
              {titleArticle}
            </Link>
            <Like slug={slug} favorited={favorited} favoritesCount={favoritesCount} />
          </div>
          <div className={cn(classes['div-title-tag__div-tags'])}>
            {validTagsList?.map((tag, i) => {
              return (
                <div key={i} className={cn(classes['div-tags__tag'])}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className={cn(classes['header__div-user-date'])}>
          <div className={cn(classes['div-user-date__wrapper-name-date'])}>
            <span className={cn(classes['div-user-date__user-name'])}>{author?.username}</span>
            <span className={cn(classes['div-user-date__date'])}>{formattedDate}</span>
          </div>
          <img className={cn(classes['div-users-date__user-avatar'])} src={avatar} />
        </div>
      </div>
      <span className={cn(classes.item__text)}>{formattedDescription}</span>
    </>
  );
};

export default Item;
