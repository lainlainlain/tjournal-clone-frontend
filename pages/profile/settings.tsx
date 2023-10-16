import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';

export default function Settings() {
  return (
    <MainLayout>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Основные настройки</Typography>
        <form>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="nickname">Никнейм</InputLabel>
            <OutlinedInput id="nickname" label="Никнейм" required />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="email">Эл. почта</InputLabel>
            <OutlinedInput id="email" label="Эл. почта" required />
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <OutlinedInput id="password" label="Пароль" required />
          </FormControl>
          <Button color="primary" variant="contained">
            Сохранить изменения
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
}
