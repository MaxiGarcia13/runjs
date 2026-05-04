import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { cn } from '@/utils/classes';

interface EditorProps {
  className?: string;
}

export function Editor({ className }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const instance = editor.create(editorRef.current, {
        value: 'console.log("Hello, world!");',
        language: 'javascript',
        theme: 'vs-dark',

        fontSize: 18,
        minimap: {
          enabled: false,
        },

        lineNumbers: 'off',
        fontLigatures: true,
        wordWrap: 'on',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'off',
        tabSize: 2,

        automaticLayout: true,
        fixedOverflowWidgets: true,
        scrollBeyondLastLine: false,
        roundedSelection: false,

        padding: {
          top: 16,
        },
      });

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
