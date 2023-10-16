import React, { FC, memo, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
  initialBlocks: OutputData['blocks'];
  onChange: (blocks: OutputData['blocks']) => void;
  holder: string;
}

const EditorBlock: React.FC<EditorProps> = ({ initialBlocks, onChange, holder }) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: 'Введите текст вашей статьи',
        data: {
          blocks: initialBlocks,
        },
        async onChange(api, event) {
          // const data = await api.saver.save();
          const { blocks } = await editor.save();
          onChange(blocks);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} />;
};

export default memo(EditorBlock);
