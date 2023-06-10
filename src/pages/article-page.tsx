import React from 'react';
import { useParams } from 'react-router-dom';

import Article from '../components/article';

const ArticlePage = () => {
  const { slug } = useParams();

  return <Article slug={slug} />;
};

export { ArticlePage };
