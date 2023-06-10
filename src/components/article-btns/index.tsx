import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Slug } from '../article';
import { useActions } from '../../hooks/useActions';
import classes from './article-btns.module.scss';

const ArticleBtns = ({ slug }: Slug) => {
  const { fetchDeleteArticle, fetchArticles } = useActions();
  const navigate = useNavigate();

  const confirm = () => {
    fetchDeleteArticle(slug);
    fetchArticles();
    navigate('/');
    message.success('Article deleted successfully');
  };

  const cancel = () => {
    message.error('Deletion was canceled');
  };

  return (
    <div className={classes['item__div-article-btns']}>
      <Popconfirm
        title="Are you sure to delete this article?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Link to={`edit`}>
        <Button className={classes['div-article-btns__edit-btn']}>Edit</Button>
      </Link>
    </div>
  );
};

export { ArticleBtns };
