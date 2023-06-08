import { Button, Input } from '@material-ui/core';
import React from 'react';
import styles from './AddComment.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { Api } from '@/utils/api';

interface AddCommentFormProps {
  postId: number;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId }) => {
  const [isLoading, setLoading] = React.useState(false);
  const isAuth = useAppSelector(selectUserData);
  const [selected, setSelected] = React.useState(false);
  const [textValue, setTextValue] = React.useState('');

  const addComment = async () => {
    try {
      const comment = await Api().comment.create({
        postId,
        text: textValue,
      });
      console.log(comment);
      setLoading(true);

      setSelected(false);
      setTextValue('');
    } catch (err) {
      console.warn('Add comment err', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <div className={styles.form}>
        <Input
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
          onFocus={() => setSelected(true)}
          minRows={selected ? 5 : 1}
          multiline
          classes={{ root: styles.fieldRoot }}
          fullWidth
          placeholder="Напишите ваш комментарий..."></Input>
      </div>
      {selected && (
        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'flex-start' }}>
          <Button disabled={isLoading} variant="contained" color="primary" onClick={addComment}>
            Опубликовать
          </Button>
        </div>
      )}
    </>
  );
};
