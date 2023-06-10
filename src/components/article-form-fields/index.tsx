import React from 'react';
import cn from 'classnames';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Spinner } from '../spinner';
import { Slug } from '../article';

import classes from './article-form-fields.module.scss';

export interface Inputs {
  title: string;
  description: string;
  body: string;
  tagList: {
    name: string;
  }[];
}
const loader = (
  <div className={classes.form__spin}>
    <Spinner size={25} />
  </div>
);

const ArticleFormFields = ({ slug }: Slug) => {
  const tagListSchema = {
    name: Yup.string()
      .required('If you don not want to add tag, please delete this field')
      .max(14, 'Tag length cannot exceed more than 14 characters'),
  };
  const formSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(54, 'Text length cannot exceed more than 54 characters'),
    description: Yup.string()
      .required('Description is required')
      .max(231, 'Description length cannot exceed more than 231 characters'),
    body: Yup.string().required('Text is required'),
    tagList: Yup.array().of(Yup.object().shape(tagListSchema)),
  });

  const { fetchCreateArticle, fetchEditArticle, fetchArticles } = useActions();
  const navigate = !slug ? () => null : useNavigate();

  const typeOfFetch = !slug ? fetchCreateArticle : fetchEditArticle;
  const needFetchArticles = !slug ? () => null : fetchArticles;

  const { article } = useTypedSelector((state) => state.anArticle);
  const { loading } = useTypedSelector((state) => state.createArticle);
  const { title, description, body, tagList } = article;
  const defaultTitle = !slug ? '' : title;
  const defaultDescription = !slug ? '' : description;
  const defaultBody = !slug ? '' : body;
  const formatedTagList = tagList.map((tag) => {
    return { name: tag };
  });
  const defaultTagList = !slug ? [] : formatedTagList;
  const createdMsg = 'Article created successfully';
  const editedMsg = 'Article edited successfully';
  const typeOfMessage = !slug ? createdMsg : editedMsg;

  const tagsIndexesForErrors = [];

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: defaultTitle,
      description: defaultDescription,
      body: defaultBody,
      tagList: defaultTagList,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  function onSubmit(data: Inputs) {
    const article = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.name),
      },
    };

    typeOfFetch(article, slug);
    needFetchArticles();
    reset();
    remove();
    navigate('/', { replace: true });
    message.success(typeOfMessage);
  }

  const spinner = loading ? loader : null;

  return (
    <form className={cn(classes['article-creator__form'])} onSubmit={handleSubmit(onSubmit)}>
      <label className={cn(classes['form__label-title'], classes['form-label'])}>Title</label>
      <input
        {...register('title')}
        className={cn(classes['form__input-title'], classes['form-input'])}
        placeholder="Title"
      />
      <span className={cn(classes['form__span-error'])}>{errors?.title && errors?.title?.message}</span>
      <label className={cn(classes['form__label-description'], classes['form-label'])}>Short description</label>
      <input
        {...register('description')}
        className={cn(classes['form__input-description'], classes['form-input'])}
        placeholder="Short description"
      />
      <span className={cn(classes['form__span-error'])}>{errors?.description && errors?.description?.message}</span>
      <label className={cn(classes['form__label-text'], classes['form-label'])}>Text</label>
      <textarea
        {...register('body')}
        className={cn(classes['form__text-area-text'], classes['form-input'])}
        placeholder="Text"
      />
      <span className={cn(classes['form__span-error'])}>{errors?.body && errors?.body?.message}</span>
      <label className={cn(classes['form__label-tags'], classes['form-label'])}>Tags</label>
      <div className={cn(classes['form__div-tags'])}>
        <div className={cn(classes['div-tags__new-tag'], classes['div-tag'])}>
          {fields.map((field, index) => {
            tagsIndexesForErrors.push(index);

            return (
              <section className={cn(classes['new-tag__wrapper'])} key={field.id}>
                <div className={cn(classes['wrapper__div-wrap'])}>
                  <input
                    {...register(`tagList.${index}.name`)}
                    className={cn(classes['div-wrap__input-tag'], classes['form-input'])}
                    type="text"
                    placeholder="Tag"
                  />
                  <button
                    className={cn(classes['div-wrap__delete-btn'], classes['tag-delete-btn'])}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </div>
                <span className={cn(classes['wrapper__span-error-tags'])}>
                  {errors?.tagList && errors?.tagList?.[index]?.name?.message}
                </span>
              </section>
            );
          })}
        </div>
        <div className={cn(classes['div-tags__wrapper-add-btn'])}>
          <button
            className={cn(classes['wrapper-add-btn__add-btn'], classes['tag-add-btn'])}
            type="button"
            onClick={() => append({ name: '' })}
          >
            Add tag
          </button>
          <span className={cn(classes['wrapper-add-btn__span-error'])}>
            {errors?.tagList && (
              <span className={cn(classes['span-error__add-btn-error'])}>
                {errors?.tagList?.[tagsIndexesForErrors.length - 1]?.name?.message}
              </span>
            )}
          </span>
        </div>
      </div>
      {spinner || <input className={cn(classes['form__submit'])} type="submit" value="Send" />}
    </form>
  );
};

export { ArticleFormFields };
