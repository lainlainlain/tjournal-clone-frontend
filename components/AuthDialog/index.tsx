import React from 'react';

import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
  Typography,
  TextField,
  Divider,
} from '@material-ui/core';
import ArrowBackicon from '@material-ui/icons/ArrowBack';

import styles from './AuthDialog.module.scss';
import { Main } from './forms/Main';
import { Login } from './forms/Login';
import { Register } from './forms/Register';

interface AuthDialogProps {
  onClose: () => void;
  visible: boolean;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ visible, onClose }) => {
  const [formType, setFormType] = React.useState<'main' | 'login' | 'register'>('main');
  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <div className={styles.content}>
          <Typography className={styles.title}>
            {formType === 'main' ? (
              'Вход на TJ'
            ) : (
              <p onClick={() => setFormType('main')} className={styles.backTitle}>
                <ArrowBackicon></ArrowBackicon>К авторизации
              </p>
            )}
          </Typography>
          {formType === 'main' && <Main onOpenLoginForm={() => setFormType('login')} />}
          {formType === 'login' && <Login onOpenRegisterForm={() => setFormType('register')} />}
          {formType === 'register' && (
            <Register
              onOpenLoginForm={() => setFormType('login')}
              onOpenRegister={() => setFormType('register')}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
