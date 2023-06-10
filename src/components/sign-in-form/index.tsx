import React, { useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../hooks/useAuth';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUserPost } from '../../types/sign-user';
import { Spinner } from '../spinner';

import classes from './sign-in-form.module.scss';

type Inputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email address is required')
      .matches(/^[0-9a-z][a-z0-9._\-^s]*@[a-z]*\.[a-z]+/, 'Email address is not valid: example@mail.com.'),
    password: Yup.string().required('Password is required'),
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

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const isUser = useTypedSelector((state) => state.userData.user.username);
  const serverError = useTypedSelector((state) => state.userData.errors);
  const loading = useTypedSelector((state) => state.userData.loading);

  useEffect(() => {
    if (isUser) navigate(fromPage, { replace: true });
  }, [isUser]);

  useEffect(() => {
    if (serverError['email or password']) {
      setError('email', {
        type: 'server',
        message: 'Email or password is invalid.',
      });
    }
    if (serverError['email or password']) {
      setError('password', {
        type: 'server',
        message: 'Email or password is invalid.',
      });
    }
  }, [serverError]);

  const fromPage = location.state?.from?.pathname || '/';

  const onSubmit = (data: Inputs) => {
    const user: IUserPost = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    signIn(user, () => null);
    reset();
  };

  const isSpinner = loading ? <Spinner size={25} /> : null;

  return (
    <div className={cn(classes['main__sign-in-form'])}>
      <span className={cn(classes['sign-in-form__title'])}>Sign In</span>
      <form className={cn(classes['sign-in-form__form'])} onSubmit={handleSubmit(onSubmit)}>
        <label className={cn(classes['form__label-email form-label'], classes['form-label'])}>Email address</label>
        <input
          {...register('email')}
          className={cn(classes['form__input-email'], classes['form-input'])}
          placeholder="Email address"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.email && errors?.email?.message}</span>
        <label className={cn(classes['form__label-password form-label'], classes['form-label'])}>Password</label>
        <input
          {...register('password')}
          className={cn(classes['form__input-password'], classes['form-input'])}
          type="password"
          placeholder="Password"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.password && errors?.password?.message}</span>
        <div className={cn(classes['form__div-wrapper-submit-sign-in'])}>
          {isSpinner || (
            <input className={cn(classes['div-wrapper-submit-sign-in__submit'])} type="submit" value="Login" />
          )}
          <span className={cn(classes['div-wrapper-submit-sign-in__span-under-create'])}>
            Don’t have an account?
            <Link to="/sign-up" className={cn(classes['span-under-create__a-sign-up'])}>
              Sign Up.
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
