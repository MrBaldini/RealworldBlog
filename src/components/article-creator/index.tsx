import React from 'react';
import cn from 'classnames';

import { ArticleFormFields } from '../article-form-fields';

import classes from './article-creator.module.scss';

const ArticleCreator = () => {
  return (
    <div className={cn(classes['main__article-creator'])}>
      <span className={cn(classes['article-creator__title'])}>Create new article</span>
      <ArticleFormFields slug="" />
    </div>
  );
};

export { ArticleCreator };
