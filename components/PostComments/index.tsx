import React from 'react';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';

type CommentObj = {
  user: {
    fullname: string;
    avatarUrl: string;
  };
  id: number;
  text: string;
  createdAt: string;
};

interface PostCommentsProps {
  items: CommentObj[];
}

export const PostComments: React.FC<PostCommentsProps> = ({ items }) => {
  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          42 комментария
        </Typography>
        <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Популярные" />
          <Tab label="По порядку" />
        </Tabs>
        <Divider />
        <div className="mb-20" />
        {items.map((item) => (
          <Comment
            key={item.id}
            createdAt={item.createdAt}
            text={item.text}
            user={item.user}></Comment>
        ))}
      </div>
    </Paper>
  );
};
