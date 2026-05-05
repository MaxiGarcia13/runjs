import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { cn } from '@/utils/classes';

interface EditorProps {
  className?: string;
}

export function Editor({ className }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const { code, setCode } = useEditorStore();

  useEffect(() => {
    if (editorRef.current) {
      const instance = editor.create(editorRef.current, {
        value: code,

        language: 'javascript',
        theme: 'vs-dark',

        fontFamily: 'Fira Code, monospace',
        fontLigatures: true,
        fontSize: 16,

        minimap: {
          enabled: false,
        },

        lineNumbers: 'off',

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

      instance.onDidChangeModelContent(() => {
        const value = instance.getValue();
        setCode(value);
      });

      return () => {
        instance.dispose();
      };
    }
  }, []);

  return (
    <section className={cn('box-border h-full min-h-0 w-full overflow-hidden rounded-md border border-[#44475A] bg-[#282A36]', className)}>
      <div ref={editorRef} className="h-full w-full" />
    </section>
  );
}
