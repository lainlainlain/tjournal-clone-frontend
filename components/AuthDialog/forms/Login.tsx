import { Button, TextField } from '@material-ui/core';
import React from 'react';

interface LoginProps {
  onOpenRegisterForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ onOpenRegisterForm }) => (
  <form>
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
        Войти
      </Button>
      <Button onClick={onOpenRegisterForm} color="primary" variant="text">
        Зарегистрироваться
      </Button>
    </div>
  </form>
);
