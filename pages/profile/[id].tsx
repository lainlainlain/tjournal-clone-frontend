import Link from 'next/link';
import { Paper, Avatar, Typography, Button, Tabs, Tab } from '@material-ui/core';
import {
  SettingsOutlined as SettingsIcon,
  TextsmsOutlined as MessageIcon,
} from '@material-ui/icons';

import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Api } from '@/utils/api';
import { ResponseUser } from '@/utils/api/types';

interface ProfileProps {
  user: ResponseUser;
}

const Profile: NextPage<ProfileProps> = ({ user }) => {
  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
        <div className="d-flex justify-between">
          <div>
            <Avatar style={{ width: 120, height: 120, borderRadius: 6 }}>{user.fullName[0]}</Avatar>
            <Typography style={{ fontWeight: 'bold' }} className="mt-10" variant="h4">
              {user && user.fullName}
            </Typography>
          </div>
          <div>
            <Link href="/profile/settings">
              <Button
                style={{ height: 42, minWidth: 45, width: 45, marginRight: 10 }}
                variant="contained">
                <SettingsIcon />
              </Button>
            </Link>
            <Button style={{ height: 42 }} variant="contained" color="primary">
              <MessageIcon className="mr-10" />
              Написать
            </Button>
          </div>
        </div>
        <div className="d-flex mb-10 mt-10">
          <Typography style={{ fontWeight: 'bold', color: '#35AB66' }} className="mr-15">
            +208
          </Typography>
          <Typography>2 подписчика</Typography>
        </div>
        <Typography>На проекте с 15 сен 2016</Typography>

        <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Статьи" />
          <Tab label="Комментарии" />
          <Tab label="Закладки" />
        </Tabs>
      </Paper>
      <div className="d-flex align-start">
        <div className="mr-20 flex">
          <Post />
        </div>
        <Paper style={{ width: 300 }} className="p-20 mb-20" elevation={0}>
          <b>Подписчики</b>
          <div className="d-flex mt-15">
            <Avatar
              className="mr-10"
              src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
            />
            <Avatar
              className="mr-10"
              src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
            />
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const pageId = ctx!.params!.id!;

    const user = await Api(ctx).user.findOne(+pageId);

    return {
      props: { user },
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
