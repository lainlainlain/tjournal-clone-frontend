import { LoginFormSchema } from '@/utils/validations';
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../FormField';
import { LoginDto } from '@/utils/api/types';
import { UserApi } from '@/utils/api';
import { setCookie } from 'nookies';
import { Alert } from '@material-ui/lab';
import { setTimeout } from 'timers/promises';

interface LoginProps {
  onOpenRegisterForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ onOpenRegisterForm }) => {
  const [loginMessage, setLoginMessage] = React.useState('');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await UserApi.login(dto);
      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      console.log(data);
      setLoginMessage('Успешный вход!');
    } catch (err) {
      console.warn('Register error', err);

      if (err.response) {
        setLoginMessage(err.response.data.message);
      }
    }
  };

  console.log(form.formState.errors.email?.message);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name={'email'} label={'Почта'}></FormField>
        <FormField name={'password'} label={'Пароль'} />
        {loginMessage && (
          <Alert
            severity={loginMessage === 'Успешный вход!' ? 'success' : 'error'}
            className="mb-20">
            {loginMessage}
          </Alert>
        )}
        <div className="d-flex align-center justify-between">
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            color="primary"
            variant="contained"
            type="submit">
            Войти
          </Button>
          <Button onClick={onOpenRegisterForm} color="primary" variant="text">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
