import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm/index';
import { NextPage } from 'next';
import { Api } from '@/utils/api';

interface WritePageProps {
  post: PostItem;
}
import { PostItem } from '@/utils/api/types';

const WritePage: NextPage<WritePageProps> = ({ post }) => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm data={post}></WriteForm>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const pageId = ctx.params.id;
    const post = await Api(ctx).post.getOne(+pageId);
    const user = await Api(ctx).user.getMe();

    if (post.user.id !== user.id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

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

export default WritePage;
