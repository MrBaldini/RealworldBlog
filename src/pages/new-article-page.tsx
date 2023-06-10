import React from 'react';
import { ArticleCreator } from '../components/article-creator';

const NewArticlePage = () => {
  localStorage.removeItem('kataBlogSlug');

  return <ArticleCreator />;
};

export { NewArticlePage };
