import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';

export const posts = [
  {
    id: 1,
    user: {
      fullname: 'Вася Пупкин',
      avatarUrl:
        'https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/',
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
    createdAt: '22',
  },
  {
    id: 2,
    user: {
      fullname: 'Вася ',
      avatarUrl:
        'https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/',
    },
    text: 'Теперь, каждое рабочее утро, после , я перекладываюсь туда',
    post: {
      title: 'Какая у вас дома ванна?',
    },
    createdAt: '33',
  },
  {
    id: 3,
    user: {
      fullname: 'Вася Пупкин',
      avatarUrl:
        'https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/',
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я  ',
    post: {
      title: 'Какая у вас дома ванна?',
    },
    createdAt: '44',
  },
];

export const SideComments = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={() => setVisible(!visible)}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible && posts.map((obj) => <CommentItem key={obj.id} {...obj} />)}
    </div>
  );
};
