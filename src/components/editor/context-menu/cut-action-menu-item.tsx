import type { editor } from 'monaco-editor';
import { KeyCode, KeyMod } from 'monaco-editor';
import { useEffect } from 'react';
import { CutIcon } from '@/assets/icons/cut';
import { ContextMenuItem } from './context-menu-item';

interface CutActionMenuItemProps {
  editor: editor.IStandaloneCodeEditor;
}

export function CutActionMenuItem({ editor }: CutActionMenuItemProps) {
  const runCutAction = async () => {
    const cutAction = editor?.getAction('customCut');
    await cutAction?.run();
    editor.focus();
  };

  useEffect(() => {
    editor.addAction({
      id: 'customCut',
      label: 'Cut',
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyX],
      run: async () => {
        const model = editor?.getModel();
        const selection = editor?.getSelection();

        if (!editor || !model || !selection || selection.isEmpty()) {
          return;
        }

        const selectedText = model.getValueInRange(selection);

        await navigator.clipboard.writeText(selectedText);

        editor.executeEdits('cut', [{
          range: selection,
          text: '',
        }]);
      },
    });
  }, []);

  return (
    <ContextMenuItem
      onClick={runCutAction}
      icon={<CutIcon className="size-4" />}
    >
      Cut
    </ContextMenuItem>
  );
}
