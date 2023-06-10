import React, { useEffect } from 'react';
import cn from 'classnames';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUserPost } from '../../types/sign-user';
import { Spinner } from '../spinner';
import classes from './sign-up-form.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  termOfService: boolean;
};

type HandleSubmitParam = {
  username: string;
  email: string;
  password: string;
};

const SignUpForm: React.FC = () => {
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username length should be at least 3 characters')
      .max(20, 'Username cannot exceed more than 20 characters.'),
    email: Yup.string()
      .required('Email address is required')
      .matches(/^[0-9a-z][a-z0-9._\-^s]*@[a-z]*\.[a-z]+/, 'Email address is not valid: example@mail.com.'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters'),
    cpassword: Yup.string()
      .required('Confirm Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    termOfService: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
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

  const { fetchSignUpUser } = useActions();

  const user = useTypedSelector((state) => state.userData.user.username);
  const serverError = useTypedSelector((state) => state.userData.errors);
  const loading = useTypedSelector((state) => state.userData.loading);

  useEffect(() => {
    if (serverError.email) {
      setError('email', {
        type: 'server',
        message: 'Email is already taken.',
      });
    }
    if (serverError.username) {
      setError('username', {
        type: 'server',
        message: 'Username is already taken.',
      });
    }
  }, [serverError]);

  function onSubmit(data: HandleSubmitParam) {
    const user: IUserPost = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    fetchSignUpUser(user);

    reset();
  }

  if (user) return <Navigate to="/" replace />;
  const isSpinner = loading ? <Spinner size={25} /> : null;

  return (
    <div className={cn(classes['main__sign-up-form'])}>
      <span className={cn(classes['sign-up-form__title'])}>Create new account</span>
      <form className={cn(classes['sign-up-form__form'])} onSubmit={handleSubmit(onSubmit)}>
        <label className={cn(classes['form__label-username'], classes['form-label'])}>Username</label>
        <input
          {...register('username')}
          className={cn(classes['form__input-username'], classes['form-input'])}
          placeholder="Username"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.username && errors?.username?.message}</span>
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
        <label className={cn(classes['form__label-repeat-pwd form-label'], classes['form-label'])}>
          Repeat Password
        </label>
        <input
          {...register('cpassword')}
          className={cn(classes['form__input-repeat-pwd'], classes['form-input'])}
          type="password"
          placeholder="Repeat Password"
        />
        <span className={cn(classes['form__span-error'])}>{errors?.cpassword && errors?.cpassword?.message}</span>
        <div className={cn(classes['form__div-agrement'])}>
          <input {...register('termOfService')} className={cn(classes['div-agrement__checkbox'])} type="checkbox" />
          <label className={cn(classes['div-agrement__label'])}>
            I agree to the processing of my personal information
          </label>
        </div>
        <span className={cn(classes['form__span-error'])}>
          {errors?.termOfService && errors?.termOfService?.message}
        </span>
        <div className={cn(classes['form__div-wrapper-submit'])}>
          {isSpinner || <input className={cn(classes['div-wrapper-submit__submit'])} type="submit" value="Create" />}
          <span className={cn(classes['div-wrapper-submit__span-under-create'])}>
            Already have an account?
            <Link to="/sign-in" className={cn(classes['span-under-create__a-sign-in'])}>
              Sign In.
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
