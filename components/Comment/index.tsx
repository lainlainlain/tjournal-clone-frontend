import React from 'react';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { CommentItem, ResponseUser } from '@/utils/api/types';
import { Api } from '@/utils/api';
import { AddCommentForm } from '../AddCommentForm';
import { useComments } from '@/hooks/useComments';
import { CommentUpdateDto } from '@/utils/api/comment';

interface CommentProps {
  id: number;
  user: ResponseUser;
  createdAt: string;
  text: string;
  currentUserId?: number;
  onRemove: (id: number) => void;
  onSetActiveForm: (id: number) => void;
  activeAnswerForm: number | undefined;
  onEditComment?: (obj: CommentUpdateDto) => void;
}

export const Comment: React.FC<CommentProps> = ({
  user,
  createdAt,
  text,
  currentUserId,
  id,
  onRemove,
  onSetActiveForm,
  activeAnswerForm,
  onEditComment,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [replyActive, setReplyActive] = React.useState<boolean>();
  const { comments, setComments } = useComments();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDelete = async () => {
    if (window.confirm('Удалить комменатрий?')) {
      try {
        await Api().comment.delete(id);
        onRemove(id);
      } catch (err) {
        console.warn('Deletion went wrong', err);
      } finally {
        handleClose();
      }
    }
  };

  const handleCommentUpdate = () => {};

  // TODO:
  // Сделать добавления комментария к комментарию
  const onAddComments = (comment: CommentItem) => {
    setComments((prev) => [...prev, comment]);
  };
  const onDeleteComment = (id: number) => {
    setComments((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar style={{ marginRight: '15px' }}>{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{createdAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      {currentUserId && (
        <span
          className={styles.replyBtn}
          onClick={() => {
            onSetActiveForm(id);
            setReplyActive(true);
          }}>
          Ответить
        </span>
      )}

      {user.id === currentUserId && (
        <>
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            elevation={2}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted>
            <MenuItem onClick={handleCommentDelete}>Удалить</MenuItem>
            <MenuItem
              onClick={() => {
                onSetActiveForm(id);
                setReplyActive(false);
              }}>
              Редактировать
            </MenuItem>
          </Menu>
        </>
      )}
      {activeAnswerForm === id && (
        <AddCommentForm
          commentFormCase={replyActive ? 'reply' : 'update'}
          commentId={id}
          onEditComment={onEditComment}></AddCommentForm>
      )}
    </div>
  );
};
