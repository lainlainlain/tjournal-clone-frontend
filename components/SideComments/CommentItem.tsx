import Link from 'next/link';
import styles from './SideComments.module.scss';

interface CommentItemProps {
  user: {
    fullname: string;
    id: number;
  };
  text: string;
  post: {
    title: string;
    id: number;
  };
}

export const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img src="https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/" />

        <Link href={`/profile/${user.id}`}>
          <b>{user.fullname}</b>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>

      <Link href={`/news/${post.id}`}>
        <span className={styles.postTitle}>{post.title}</span>
      </Link>
    </div>
  );
};
