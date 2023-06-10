import React from 'react';
import cn from 'classnames';
import { ArticleFormFields } from '../article-form-fields';
import classes from './article-editor.module.scss';
import { Slug } from '../article';

const ArticleEditor = ({ slug }: Slug) => {
  return (
    <div className={cn(classes['main__article-creator'])}>
      <span className={cn(classes['article-creator__title'])}>Edit article</span>
      <ArticleFormFields slug={slug} />
    </div>
  );
};

export default ArticleEditor;
