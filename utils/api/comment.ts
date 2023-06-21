import { AxiosInstance } from 'axios';
import { CommentItem, PostItem } from './types';
interface CommentDto {
  text: string;
  postId?: number;
}
export interface CommentUpdateDto {
  text: string;
  id: number;
}

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId?: number) {
    const { data } = await instance.get('/comments', { params: { postId } });

    return data;
  },
  async create(dto: CommentDto) {
    const { data } = await instance.post<CommentDto, { data: CommentItem }>('/comments', dto);

    return data;
  },
  async delete(id: number) {
    return instance.delete('/comments/' + id);
  },

  async update(id: number, dto: CommentUpdateDto) {
    const { data } = await instance.patch('/comments/' + id, dto);
    return data;
  },
});
