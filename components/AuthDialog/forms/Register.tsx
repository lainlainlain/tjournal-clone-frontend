import { Button, TextField } from '@material-ui/core';
import React from 'react';

interface RegisterProps {
  onOpenLoginForm: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onOpenLoginForm }) => {
  return (
    <form>
      <TextField
        className="mb-20"
        size="small"
        label="Ваше имя и фамилия"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        className="mb-20"
        size="small"
        label="Эл. почта"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        className="mb-15"
        size="small"
        label="Пароль"
        variant="outlined"
        fullWidth
        required
      />
      <div className="d-flex align-center justify-between">
        <Button color="primary" variant="contained">
          Регистрация
        </Button>
        <Button onClick={onOpenLoginForm} color="primary" variant="text">
          Войти
        </Button>
      </div>
    </form>
  );
};
