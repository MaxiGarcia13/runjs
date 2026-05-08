import type { editor } from 'monaco-editor';
import { CopyActionMenuItem } from './copy-action-menu-item';
import { CutActionMenuItem } from './cut-action-menu-item';
import { PasteActionMenuItem } from './paste-action-menu-item';

interface ContextMenuPanelProps {
  x: number;
  y: number;
  editor: editor.IStandaloneCodeEditor;
}
export function ContextMenuPanel({ x, y, editor }: ContextMenuPanelProps) {
  return (
    <div
      role="menu"
      className="fixed z-50 min-w-[160px] rounded-md border border-gray-600 bg-gray-700 py-1 shadow-xl"
      style={{ left: x, top: y }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <PasteActionMenuItem editor={editor} />
      <CopyActionMenuItem editor={editor} />
      <CutActionMenuItem editor={editor} />
    </div>
  );
}
