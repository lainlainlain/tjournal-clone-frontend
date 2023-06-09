import { Api } from '@/utils/api';
import { CommentItem } from '@/utils/api/types';
import { SetStateAction } from 'react';
import React from 'react';

type UseCommentsProps = {
  setComments: React.Dispatch<SetStateAction<CommentItem[]>>;
  comments: CommentItem[];
};

export const useComments = (postId?: number): UseCommentsProps => {
  const [comments, setComments] = React.useState<CommentItem[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const comments = await Api().comment.getAll(postId);
        setComments(comments);
      } catch (err) {
        console.warn('Fetch comments err', err);
      }
    })();
  }, []);

  return { comments, setComments };
};
