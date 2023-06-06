import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import { PostComments } from '@/components/PostComments';
import { NextPage } from 'next';
import { PostItem } from '@/utils/api/types';
import { Api } from '@/utils/api';

interface PostProps {
  post: PostItem;
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost title={post.title} blocks={post.body} />
      <PostComments></PostComments>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const pageId = ctx.params.id;
    const post = await Api(ctx).post.getOne(+pageId);

    return {
      props: { post },
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Post;
