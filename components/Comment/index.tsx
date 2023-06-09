import React from 'react';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { ResponseUser } from '@/utils/api/types';
import { Api } from '@/utils/api';

interface CommentProps {
  id: number;
  user: ResponseUser;
  createdAt: string;
  text: string;
  currentUserId?: number;
  onRemove: (id: number) => void;
}

export const Comment: React.FC<CommentProps> = ({
  user,
  createdAt,
  text,
  currentUserId,
  id,
  onRemove,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDelete = async () => {
    handleClose();
    try {
      await Api().comment.delete(id);
      onRemove(id);
    } catch (err) {
      console.warn('Deletion went wrong', err);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar style={{ marginRight: '15px' }}>{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{createdAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      {currentUserId && <span className={styles.replyBtn}>Ответить</span>}
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
            <MenuItem onClick={handleClose}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};
