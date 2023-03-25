import { LoginFormSchema } from '@/utils/validations';
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../FormField';

interface LoginProps {
  onOpenRegisterForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ onOpenRegisterForm }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  console.log(form.formState.errors.email?.message);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name={'email'} label={'Почта'}></FormField>
        <FormField name={'password'} label={'Пароль'} />
        <div className="d-flex align-center justify-between">
          <Button
            disabled={!form.formState.isValid}
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
