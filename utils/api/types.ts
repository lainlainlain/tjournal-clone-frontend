import { OutputData } from '@editorjs/editorjs';

export type LoginDto = {
  password?: string;
  email?: string;
};

export type CreateUserDto = {
  fullName?: string;
} & LoginDto;

export type ResponseUser = {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export type PostItem = {
  body: OutputData['blocks'];
  createdAt: string;
  description: string;
  id: number;
  user: ResponseUser;
  tags: any[] | null;
  title: string;
  updatedAt: string;
  views: number;
};

export type CommentItem = {
  test: string;
  post: PostItem;
  user: ResponseUser;
  id: number;
  createdAt: string;
  updatedAt: string;
};
