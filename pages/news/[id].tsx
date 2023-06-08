import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React, { ContextType } from 'react';
import { PostComments } from '@/components/PostComments';
import { GetServerSideProps, NextPage } from 'next';
import { PostItem } from '@/utils/api/types';
import { Api } from '@/utils/api';
import { Context } from 'next-redux-wrapper';

interface PostProps {
  post: PostItem;
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost title={post.title} blocks={post.body} />
      <PostComments postId={post.id}></PostComments>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const pageId = ctx!.params!.id!;
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
