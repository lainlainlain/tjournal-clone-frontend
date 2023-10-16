import { Post } from '@/components/Post';
import { MainLayout } from '@/layouts/MainLayout';
import { setUserData } from '@/redux/slices/user';
import { wrapper } from '@/redux/store';
import { Api } from '@/utils/api';
import { PostItem } from '@/utils/api/types';
import { UserApi } from '@/utils/api/user';
import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';

import React from 'react';

interface HomeProps {
  posts: PostItem[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <MainLayout>
        {posts.map((obj, index) => {
          return (
            <Post
              id={obj.id}
              key={index}
              title={obj.title}
              description={obj.description.replace(/&nbsp;/g, '')}></Post>
          );
        })}
      </MainLayout>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const posts = await Api().post.getAll();

    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.warn('Получение постов', err);
    alert('Возникла ошибка');
  }

  return {
    props: {
      posts: null,
    },
  };
};
