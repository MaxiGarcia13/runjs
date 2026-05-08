import type { editor } from 'monaco-editor';
import type { MouseEvent, ReactNode, TouchEvent } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
import { ContextMenuPanel } from './context-menu-panel';

interface ContextMenuProps {
  children: ReactNode;
  editor: React.RefObject<editor.IStandaloneCodeEditor>;
  className?: string;
}

const LONG_PRESS_DURATION_MS = 500;
const TOUCH_MOVE_THRESHOLD_PX = 10;

export function ContextMenu({ children, editor, className }: ContextMenuProps) {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const touchStartPositionRef = useRef<{ x: number; y: number } | null>(null);

  const openMenuAt = (clientX: number, clientY: number) => {
    const menuWidth = 160;
    const menuHeight = 120;
    const x = Math.min(clientX, window.innerWidth - menuWidth);
    const y = Math.min(clientY, window.innerHeight - menuHeight);

    setMenuPosition({ x, y });
  };

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const openContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openMenuAt(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    clearLongPressTimer();

    if (event.touches.length !== 1) {
      touchStartPositionRef.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStartPositionRef.current = { x: touch.clientX, y: touch.clientY };

    longPressTimerRef.current = window.setTimeout(() => {
      longPressTimerRef.current = null;
      if (touchStartPositionRef.current) {
        openMenuAt(touchStartPositionRef.current.x, touchStartPositionRef.current.y);
      }
    }, LONG_PRESS_DURATION_MS);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartPositionRef.current || event.touches.length === 0) {
      return;
    }

    const touch = event.touches[0];
    const dx = touch.clientX - touchStartPositionRef.current.x;
    const dy = touch.clientY - touchStartPositionRef.current.y;

    if (Math.hypot(dx, dy) > TOUCH_MOVE_THRESHOLD_PX) {
      clearLongPressTimer();
    }
  };

  const cancelLongPress = () => {
    clearLongPressTimer();
    touchStartPositionRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearLongPressTimer();
    };
  }, []);

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
    <section
      className={cn('h-full w-full', className)}
      onContextMenu={openContextMenu}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={cancelLongPress}
      onTouchCancel={cancelLongPress}
    >
      {children}
      {menuPosition && editor.current && (
        <ContextMenuPanel
          x={menuPosition.x}
          y={menuPosition.y}
          editor={editor.current}
          onActionClick={() => setMenuPosition(null)}
        />
      )}
    </section>
  );
}
