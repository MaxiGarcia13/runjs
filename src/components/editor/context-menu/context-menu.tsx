import type { editor } from 'monaco-editor';
import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useState } from 'react';
import { ContextMenuPanel } from './context-menu-panel';

interface ContextMenuProps {
  children: ReactNode;
  editor: React.RefObject<editor.IStandaloneCodeEditor>;
  className?: string;
}

export function ContextMenu({ children, editor, className }: ContextMenuProps) {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const openContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const menuWidth = 160;
    const menuHeight = 120;
    const x = Math.min(event.clientX, window.innerWidth - menuWidth);
    const y = Math.min(event.clientY, window.innerHeight - menuHeight);

    setMenuPosition({ x, y });
  };

  useEffect(() => {
    if (!menuPosition) {
      return;
    }

    const handlePointerDown = () => {
      setMenuPosition(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuPosition(null);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuPosition]);

  return (
    <>
      <section
        className={cn('h-full w-full', className)}
        onContextMenu={openContextMenu}
      >
        {children}
      </section>
      {menuPosition && editor.current && (
        <ContextMenuPanel
          x={menuPosition.x}
          y={menuPosition.y}
          editor={editor.current}
        />
      )}
    </>
  );
}
