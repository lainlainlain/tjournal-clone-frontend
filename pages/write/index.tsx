import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm/index';
import { NextPage } from 'next';

const WritePage: NextPage = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm></WriteForm>
    </MainLayout>
  );
};

export default WritePage;
