import { cn } from '@maxigarcia/js-utils';
import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { EDITOR_CONSTRUCTION_OPTIONS } from './config';

interface EditorProps {
  className?: string;
}

export function Editor({ className }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const { code, setCode } = useEditorStore();

  useEffect(() => {
    if (editorRef.current) {
      const instance = editor.create(editorRef.current, {
        ...EDITOR_CONSTRUCTION_OPTIONS,
        value: code,
      });

      instance.onDidChangeModelContent(() => {
        const value = instance.getValue();
        setCode(value);
      });

      if (window === window.parent) {
        instance.focus();
      }

      return () => {
        instance.dispose();
      };
    }
  }, []);

  return (
    <section className={cn('box-border h-full min-h-0 w-full overflow-hidden', className)}>
      <div ref={editorRef} className="h-full w-full" />
    </section>
  );
}
