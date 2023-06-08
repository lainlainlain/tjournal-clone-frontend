import React from 'react';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { AddComment } from '@material-ui/icons';
import { AddCommentForm } from '../AddCommentForm';
import data from '../../data';

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const comments = data.comments[activeTab === 0 ? 'popular' : 'new'];
  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          42 комментария
        </Typography>
        <Tabs
          onChange={(_, newValue) => setActiveTab(newValue)}
          className="mt-20"
          value={activeTab}
          indicatorColor="primary"
          textColor="primary">
          <Tab label="Популярные" />
          <Tab label="По порядку" />
        </Tabs>
        <Divider />
        <AddCommentForm postId={postId}></AddCommentForm>
        <div className="mb-20" />
        {comments.map((item) => (
          <Comment
            key={item.id + Math.random()}
            createdAt={item.createdAt}
            text={item.text}
            user={item.user}></Comment>
        ))}
      </div>
    </Paper>
  );
};
