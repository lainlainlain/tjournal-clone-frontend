import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { PostActions } from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';

import styles from './FullPost.module.scss';
import { OutputData } from '@editorjs/editorjs';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';

interface FullPostProps {
  title: string;
  blocks: OutputData['blocks'];
  views: number;
}

export const FullPost: FC<FullPostProps> = ({ title, blocks, views }) => {
  const userData = useAppSelector(selectUserData);
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className="container">
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.text}>
          {blocks.map((obj) => (
            <Typography dangerouslySetInnerHTML={{ __html: obj.data.text }} key={obj.id} />
          ))}
          <div className={styles.views}>
            <span>{views} просмотров</span>
          </div>
          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions />
          </div>
          <div className="d-flex justify-between align-center mt-30 mb-30">
            <div className={styles.userInfo}>
              <Avatar>{userData?.fullName[0]}</Avatar>
              <b>{userData?.fullName}</b>
              <span>+1685</span>
            </div>

            <div>
              <Button variant="contained" className="mr-15">
                <MessageIcon />
              </Button>
              <Button variant="contained">
                <UserAddIcon />
                <b className="ml-10">Подписаться</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
