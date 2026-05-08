import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import { useEffect } from 'react';
import { CopyIcon } from '@/assets/icons/copy';
import { ContextMenuItem } from './context-menu-item';

interface CopyActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
}

export function CopyActionMenuItem({ editor }: CopyActionMenuItemProps) {
  const runCopyAction = async () => {
    const copyAction = editor?.getAction('customCopy');
    await copyAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customCopy',
      label: 'Copy',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyC],
      run: async () => {
        const selectedText = editor?.getModel().getValueInRange(editor?.getSelection());
        navigator.clipboard.writeText(selectedText);
      },
    });
  }, []);

  return (
    <ContextMenuItem
      onClick={runCopyAction}
      icon={<CopyIcon className="size-4" />}
    >
      Copy
    </ContextMenuItem>
  );
}
