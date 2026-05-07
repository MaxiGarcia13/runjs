import { cn } from '@maxigarcia/js-utils';
import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { EDITOR_CONSTRUCTION_OPTIONS } from './config';

interface EditorProps {
  className?: string;
}

export function Editor({ className }: EditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor>(null);

  const { code, debounceSetCode } = useEditorStore();

  const focusEditor = () => {
    if (window === window.parent) {
      editorInstanceRef.current?.focus();
    }
  };

  useEffect(() => {
    if (editorContainerRef.current) {
      editorInstanceRef.current = editor.create(editorContainerRef.current, {
        ...EDITOR_CONSTRUCTION_OPTIONS,
        value: code,
      });

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current.getValue();
        debounceSetCode(value);
      });

      focusEditor();

      return () => {
        editorInstanceRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current && code !== editorInstanceRef.current.getValue()) {
      editorInstanceRef.current.setValue(code);
      focusEditor();
    }
  }, [code]);

  return (
    <section className={cn('box-border h-full min-h-0 w-full overflow-hidden', className)}>
      <div ref={editorContainerRef} className="h-full w-full" />
    </section>
  );
}
