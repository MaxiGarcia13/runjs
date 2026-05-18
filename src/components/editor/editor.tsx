import { cn } from '@maxigarcia/js-utils';
import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { EDITOR_CONSTRUCTION_OPTIONS } from './config';
import { ContextMenu } from './context-menu';

interface EditorProps {
  className?: string;
}

export function Editor({ className }: EditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor>(null);

  const {
    code,
    debounceSetCode,
    revealLine,
    clearRevealLine,
  } = useEditorStore();

  const focusEditor = () => {
    if (window === window.parent) {
      editorInstanceRef.current?.focus();
    }
  };

  useEffect(() => {
    if (editorContainerRef.current) {
      editorInstanceRef.current = editor.create(
        editorContainerRef.current,
        {
          ...EDITOR_CONSTRUCTION_OPTIONS,
          contextmenu: false,
          value: code,
        },
      );

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

  useEffect(() => {
    if (revealLine == null || !editorInstanceRef.current)
      return;

    editorInstanceRef.current.revealLineInCenter(revealLine);
    editorInstanceRef.current.setPosition({
      lineNumber: revealLine,
      column: 1,
    });
    focusEditor();
    clearRevealLine();
  }, [revealLine, clearRevealLine]);

  return (
    <ContextMenu
      className={cn('relative box-border h-full min-h-0 w-full overflow-hidden', className)}
      editor={editorInstanceRef}
    >
      <div ref={editorContainerRef} className="h-full w-full" />
    </ContextMenu>
  );
}
