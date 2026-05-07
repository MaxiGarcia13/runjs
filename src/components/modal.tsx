import type { DialogHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/assets/icons/close';
import { Button } from './button';

export interface ModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'children' | 'onClose' | 'open' | 'title'> {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  closeLabel?: string;
  closeOnBackdropClick?: boolean;
  contentClassName?: string;
  showCloseButton?: boolean;
  ref?: Ref<HTMLDialogElement>;
}

export function Modal({
  children,
  open,
  onClose,
  title,
  closeLabel = 'Close modal',
  closeOnBackdropClick = true,
  contentClassName,
  showCloseButton = true,
  className,
  ref,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDialogClose = () => {
    if (open) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={cn(
        'm-auto w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl border bg-inherit border-gray-700 text-inherit p-0 shadow-2xl outline-none',
        className,
      )}
      onClick={handleBackdropClick}
      onClose={handleDialogClose}
      {...props}
    >
      <div className={cn('flex max-h-[85vh] flex-col gap-4 p-5', contentClassName)}>
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
            {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
            {showCloseButton && (
              <Button className="ml-auto border-gray-700 bg-gray-800/60" aria-label={closeLabel} onClick={onClose}>
                <CloseIcon className="size-4" />
              </Button>
            )}
          </div>
        )}

        {children}
      </div>
    </dialog>,
    document.body,
  );
}
