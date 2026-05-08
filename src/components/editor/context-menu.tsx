import type { MouseEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ContextMenuProps {
  children: ReactNode;
  onPaste: () => Promise<void>;
  onCopy: () => Promise<void>;
}

export function ContextMenu({ children, onPaste, onCopy }: ContextMenuProps) {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

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

  const openContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const menuWidth = 160;
    const menuHeight = 40;
    const x = Math.min(event.clientX, window.innerWidth - menuWidth);
    const y = Math.min(event.clientY, window.innerHeight - menuHeight);

    setMenuPosition({ x, y });
  };

  const handlePaste = async () => {
    await onPaste();
    setMenuPosition(null);
  };

  const handleCopy = async () => {
    await onCopy();
    setMenuPosition(null);
  };

  return (
    <>
      <div className="h-full w-full" onContextMenu={openContextMenu}>
        {children}
      </div>
      {menuPosition && (
        <div
          role="menu"
          className="fixed z-50 min-w-[160px] rounded-md border border-gray-600 bg-gray-700 py-1 shadow-xl"
          style={{ left: menuPosition.x, top: menuPosition.y }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            role="menuitem"
            className="w-full px-3 py-2 text-left text-sm text-zinc-100 transition-colors hover:bg-zinc-800"
            onClick={() => handleCopy()}
          >
            Copy
          </button>

          <button
            type="button"
            role="menuitem"
            className="w-full px-3 py-2 text-left text-sm text-zinc-100 transition-colors hover:bg-zinc-800"
            onClick={() => handlePaste()}
          >
            Paste
          </button>
        </div>
      )}
    </>
  );
}
