import type { ReactNode } from 'react';
import type { ToastPosition, ToastVariant } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef } from 'react';
import { CloseIcon } from '@/assets/icons/close.tsx';
import { Alert } from '../alert';
import { Button } from '../button';

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'fixed top-2 left-2',
  'top-center': 'fixed top-2 left-1/2 -translate-x-1/2',
  'top-right': 'fixed top-2 right-2',
  'center-left': 'fixed left-2 top-1/2 -translate-y-1/2',
  'center': 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  'center-right': 'fixed right-2 top-1/2 -translate-y-1/2',
  'bottom-left': 'fixed bottom-2 left-2',
  'bottom-center': 'fixed bottom-2 left-1/2 -translate-x-1/2',
  'bottom-right': 'fixed bottom-2 right-2',
};

export interface ToastProps {
  children: ReactNode;
  variant?: ToastVariant;
  position?: ToastPosition;
  onClose?: () => void;
  autoCloseAfterMs?: number;
  fixed?: boolean;
  className?: string;
}

export function Toast({
  children,
  variant = 'default',
  position = 'top-right',
  onClose,
  autoCloseAfterMs,
  fixed = true,
  className,
}: ToastProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (autoCloseAfterMs != null && autoCloseAfterMs > 0 && onCloseRef.current) {
      timeoutRef.current = setTimeout(() => onCloseRef.current?.(), autoCloseAfterMs);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [autoCloseAfterMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'min-w-[280px] max-w-md rounded-md shadow-lg z-1000',
        fixed && positionStyles[position],
        className,
      )}
    >
      <Alert
        variant={variant}
        className="flex items-center gap-2"
      >
        <span className="min-w-0 flex-1">{children}</span>
        {onClose && (
          <Button onClick={onClose} aria-label="Close">
            <CloseIcon className="size-4" />
          </Button>
        )}
      </Alert>
    </div>
  );
}
