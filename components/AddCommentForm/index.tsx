import { Button, Input } from '@material-ui/core';
import React from 'react';
import styles from './AddComment.module.scss';

export const AddCommentForm: React.FC = () => {
  const [selected, setSelected] = React.useState(false);
  const [textValue, setTextValue] = React.useState('');

  const addComment = () => {
    setSelected(false);
    setTextValue('');
  };

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
        <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'flex-end' }}>
          <Button
            className={styles.addCommentButton}
            variant="contained"
            color="primary"
            onClick={addComment}>
            Опубликовать
          </Button>
        </div>
      )}
    </>
  );
};
