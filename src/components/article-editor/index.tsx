import React from 'react';
import cn from 'classnames';

import { ArticleFormFields } from '../article-form-fields';
import { Slug } from '../article';

import classes from './article-editor.module.scss';

const ArticleEditor = ({ slug }: Slug) => {
  return (
    <div className={cn(classes['main__article-creator'])}>
      <span className={cn(classes['article-creator__title'])}>Edit article</span>
      <ArticleFormFields slug={slug} />
    </div>
  );
};

export default ArticleEditor;
