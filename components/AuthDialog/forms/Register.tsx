import { RegisterFormSchema } from '@/utils/validations';
import { Button } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../FormField';

interface RegisterProps {
  onOpenLoginForm: () => void;
  onOpenRegister: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onOpenLoginForm, onOpenRegister }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  console.log(form.formState.errors.email?.message);

  return (
    <FormProvider {...form}>
      {' '}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name={'fullname'} label={'Полное имя'}></FormField>
        <FormField name={'email'} label={'Почта'}></FormField>
        <FormField name={'password'} label={'Пароль'} />
        <div className="d-flex align-center justify-between">
          <Button
            onClick={onOpenRegister}
            disabled={!form.formState.isValid}
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
