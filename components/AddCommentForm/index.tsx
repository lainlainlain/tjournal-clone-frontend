import { Button, Input } from '@material-ui/core';
import React from 'react';
import styles from './AddComment.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { Api } from '@/utils/api';
import { CommentItem } from '@/utils/api/types';
import { CommentUpdateDto } from '@/utils/api/comment';

interface AddCommentFormProps {
  postId?: number;
  onAddComments?: (obj: CommentItem) => void;
  onEditComment?: (obj: CommentUpdateDto) => void;
  commentFormCase?: 'add' | 'update';
  commentId?: number;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onAddComments,
  commentFormCase,
  commentId,
  onEditComment,
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [textValue, setTextValue] = React.useState('');

  const addComment = async () => {
    try {
      if (commentFormCase === 'add') {
        const comment = await Api().comment.create({
          postId,
          text: textValue,
        });

        onAddComments!(comment);
      }
      if (commentFormCase === 'update' && commentId) {
        const comment = await Api().comment.update(commentId, {
          id: commentId,
          text: textValue,
        });

        onEditComment!({
          id: comment.id,
          text: comment.text,
        });
      }
      setLoading(true);

      setSelected(false);
      setTextValue('');
    } catch (err) {
      console.warn('Add comment err', err);
    } finally {
      setLoading(false);
    }
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
          placeholder={
            commentFormCase === 'add'
              ? 'Напишите ваш комментарий...'
              : 'Редактировать комментарий...'
          }></Input>
        {selected && (
          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'flex-start' }}>
            <Button disabled={isLoading} variant="contained" color="primary" onClick={addComment}>
              {commentFormCase === 'add' ? 'Опубликовать' : 'Сохранить'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
