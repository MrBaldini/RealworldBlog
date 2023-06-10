import React from 'react';
import cn from 'classnames';
import classes from './article-creator.module.scss';
import { ArticleFormFields } from '../article-form-fields';

const ArticleCreator = () => {
  return (
    <div className={cn(classes['main__article-creator'])}>
      <span className={cn(classes['article-creator__title'])}>Create new article</span>
      <ArticleFormFields slug="" />
    </div>
  );
};

export { ArticleCreator };
