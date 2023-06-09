import { OutputData } from '@editorjs/editorjs';
import { AxiosInstance } from 'axios';
import { PostItem } from './types';

interface CreatePostDto {
  body: OutputData['blocks'];
  title: string | undefined;
}

type SearchPostDto = {
  title?: string;
  body?: string;
  views?: 'DESC' | 'ASC';
  limit?: number;
  take?: number;
  tag?: string;
};

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<PostItem>('/posts');

    return data;
  },
  async create(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostItem }>('/posts', dto);

    return data;
  },
  async update(dto: CreatePostDto, id: number) {
    const { data } = await instance.patch<CreatePostDto, { data: PostItem }>(`/posts/${id}`, dto);

    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<PostItem>(`/posts/${id}`);
    return data;
  },
  async search(query: SearchPostDto) {
    const { data } = await instance.get<{ items: PostItem[]; total: number }>('/posts/search', {
      params: query,
    });

    return data;
  },
});
