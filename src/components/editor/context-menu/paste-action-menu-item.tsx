import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod, Range } from 'monaco-editor';
import { useEffect } from 'react';
import { CommandIcon } from '@/assets/icons/command';
import { PasteIcon } from '@/assets/icons/paste';
import { ContextMenuItem } from './context-menu-item';

interface PasteActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
  onActionClick: () => void;
}

export function PasteActionMenuItem({ editor, onActionClick }: PasteActionMenuItemProps) {
  const runPasteAction = async () => {
    onActionClick();
    const pasteAction = editor?.getAction('customPaste');
    await pasteAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customPaste',
      label: 'Paste',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyV],
      run: async () => {
        const model = editor?.getModel();
        const position = editor?.getPosition();
        const selection = editor?.getSelection();

        if (!editor || !model || !position) {
          return;
        }

        const pasteRange = selection && !selection.isEmpty()
          ? selection
          : new Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column,
            );

        const clipboardData = await navigator.clipboard.readText();

        editor.executeEdits('paste', [{
          range: pasteRange,
          text: clipboardData,
        }]);
      },
    });
  }, [editor]);

  return (
    <ContextMenuItem
      onClick={runPasteAction}
      icon={<PasteIcon className="size-4" />}
      command={<CommandIcon className="size-4" combination="V" />}
    >
      Paste
    </ContextMenuItem>
  );
}
