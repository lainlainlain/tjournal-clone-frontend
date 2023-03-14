import React from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic';
import { OutputData } from '@editorjs/editorjs';

const EditorBlock = dynamic(() => import('../Editor'), {
  ssr: false,
});

interface WriteFormProps {
  title?: string;
}

export const WriteForm: React.FC<WriteFormProps> = ({ title }) => {
  const [text, setText] = React.useState<OutputData>();

  return (
    <div>
      <Input classes={{ root: styles.titleField }} placeholder="Заголовок" defaultValue={title} />
      <div className={styles.editor}>
        <EditorBlock data={text} onChange={setText} holder={'holder'} />
      </div>
      <Button variant="contained" color="primary">
        Опубликовать
      </Button>
    </div>
  );
};
