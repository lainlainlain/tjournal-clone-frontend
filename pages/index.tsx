import { Post } from '@/components/Post';
import { MainLayout } from '@/layouts/MainLayout';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <>
      <MainLayout>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </MainLayout>
    </>
  );
}
