import { WriteForm } from '../components/WriteForm/index';
import { NextPage } from 'next';
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';

const WritePage: NextPage = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm></WriteForm>
    </MainLayout>
  );
};

export default WritePage;
