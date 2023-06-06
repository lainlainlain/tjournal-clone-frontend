import { RegisterFormSchema } from '@/utils/validations';
import { Button } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../FormField';
import { CreateUserDto } from '@/utils/api/types';
import { UserApi } from '@/utils/api/user';
import { setCookie } from 'nookies';
import { useAppDispatch } from '@/redux/hooks';
import { setUserData } from '@/redux/slices/user';

interface RegisterProps {
  onOpenLoginForm: () => void;
  onOpenRegister: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onOpenLoginForm, onOpenRegister }) => {
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await UserApi.register(dto);
      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      dispatch(setUserData(data));
    } catch (err) {
      console.warn('Register error', err);
    }
  };

  console.log(form.formState.errors.email?.message);

  return (
    <FormProvider {...form}>
      <FormField name={'fullName'} label={'Полное имя'}></FormField>
      <FormField name={'email'} label={'Почта'}></FormField>
      <FormField name={'password'} label={'Пароль'} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="d-flex align-center justify-between">
          <Button
            onClick={onOpenRegister}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            color="primary"
            variant="contained"
            type="submit">
            Регистрация
          </Button>
          <Button onClick={onOpenLoginForm} color="primary" variant="text">
            Войти
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
