import React from 'react';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { AddComment } from '@material-ui/icons';
import { AddCommentForm } from '../AddCommentForm';
import data from '../../data';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { Api } from '@/utils/api';
import { CommentItem, PostItem } from '@/utils/api/types';
import { useComments } from '@/hooks/useComments';
import { CommentUpdateDto } from '@/utils/api/comment';

interface PostCommentsProps {
  post: PostItem;
}

export const PostComments: React.FC<PostCommentsProps> = ({ post }) => {
  const userData = useAppSelector(selectUserData);
  const [activeTab, setActiveTab] = React.useState(0);
  const { comments, setComments } = useComments(post.id);
  const [activeAnswerForm, setActiveAnswerForm] = React.useState<number>();

  const onAddComments = (comment: CommentItem) => {
    setComments((prev) => [...prev, comment]);
  };

  const onEditComment = (comment: CommentUpdateDto) => {
    setComments((prev) =>
      prev.map((obj) => {
        if (obj.id === comment.id) {
          return {
            ...prev,
            comment,
          };
        }
      }),
    );
  };

  const onRemove = (id: number) => {
    setComments((prev) => prev.filter((obj) => obj.id !== id));
  };

  const onSetActiveForm = (id: number) => {
    setActiveAnswerForm(id);
  };

  // const comments = data.comments[activeTab === 0 ? 'popular' : 'new'];
  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          {comments.length} комментария
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
        {userData && (
          <AddCommentForm
            commentFormCase={'add'}
            onAddComments={onAddComments}
            postId={post.id}></AddCommentForm>
        )}
        <div className="mb-20" />
        {comments.map((item) => (
          <Comment
            activeAnswerForm={activeAnswerForm}
            onSetActiveForm={onSetActiveForm}
            onRemove={onRemove}
            id={item.id}
            key={item.id}
            createdAt={item.createdAt}
            text={item.text}
            user={item.user}
            currentUserId={userData?.id}
            onEditComment={onEditComment}></Comment>
        ))}
      </div>
    </Paper>
  );
};
