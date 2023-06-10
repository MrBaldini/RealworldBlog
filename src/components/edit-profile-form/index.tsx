import React, { useEffect } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Spinner } from '../spinner';

import classes from './edit-profile-form.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: string;
  image: string;
};

export type UserPut = {
  user: Inputs;
};

const loader = (
  <div className={classes.form__spin}>
    <Spinner size={25} />
  </div>
);

const EditProfileForm = () => {
  const formSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .required('Email address is required')
      .matches(/^[0-9a-z][a-z0-9._\-^s]*@[a-z]*\.[a-z]+/, 'Email address is not valid: example@mail.com.'),
    password: Yup.string()
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters'),
    image: Yup.string().matches(
      /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i,
      'Image URL for avatar should be corrected'
    ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const { fetchEditProfile, setIsUpdatedToDefault } = useActions();
  const loading = useTypedSelector((state) => state.editProfile.loading);
  const serverErrors = useTypedSelector((state) => state.editProfile.errors);
  const isUserUpdated = useTypedSelector((state) => state.editProfile.user.updated);

  useEffect(() => {
    if (isUserUpdated) {
      message.success('Profile is updated successfully');
      setIsUpdatedToDefault();
      reset();
    }
  }, [isUserUpdated]);

  useEffect(() => {
    if (serverErrors.email) {
      setError('email', {
        type: 'server',
        message: `This email ${serverErrors.email}`,
      });
    }
    if (serverErrors.username) {
      setError('username', {
        type: 'server',
        message: `This username ${serverErrors.username}`,
      });
    }
  }, [serverErrors]);

  const onSubmit = (data: Inputs) => {
    const user: UserPut = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
    };
    fetchEditProfile(user);
  };

  const isSpinner = loading ? loader : null;

  return (
    <div className={cn(classes['main__edit-profile-form'])}>
      <span className={cn(classes['edit-profile-form__title'])}>Edit Profile</span>
      <form className={cn(classes['edit-profile-form__form'])} onSubmit={handleSubmit(onSubmit)}>
        <label className={cn(classes['form__label-username'], classes['form-label'])}>Username</label>
        <input
          {...register('username')}
          className={cn(classes['form__input-username'], classes['form-input'])}
          placeholder="Username"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.username && errors?.username?.message}</span>
        <label className={cn(classes['form__label-email'], classes['form-label'])}>Email address</label>
        <input
          {...register('email')}
          className={cn(classes['form__input-email'], classes['form-input'])}
          placeholder="Email address"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.email && errors?.email?.message}</span>
        <label className={cn(classes['form__label-password'], classes['form-label'])}>New password</label>
        <input
          {...register('password')}
          className={cn(classes['form__input-password'], classes['form-input'])}
          type="password"
          placeholder="New password"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.password && errors?.password?.message}</span>
        <label className={cn(classes['form__label-repeat-pwd'], classes['form-label'])}>Avatar image (url)</label>
        <input
          {...register('image')}
          className={cn(classes['form__input-repeat-pwd'], classes['form-input'])}
          placeholder="Avatar image"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.image && errors?.image?.message}</span>
        {isSpinner || <input className={cn(classes['form__submit'])} type="submit" value="Save" />}
      </form>
    </div>
  );
};

export default EditProfileForm;
