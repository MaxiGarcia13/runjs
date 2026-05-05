import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { getState, store, subscribe } from './store';
import { Toast } from './toast-ui';
import { ToastContext } from './use-toast';

interface ToastProviderProps {
  children?: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toastState, setToastState] = useState(getState);
  const TOAST_AUTO_CLOSE_MS = 5000;

  useEffect(() => {
    return subscribe((next) => setToastState(next));
  }, []);

  const handleClose = useCallback(() => {
    store.hideToast();
  }, []);

  return (
    <ToastContext value={store}>
      {children}
      {toastState.visible && (
        <Toast
          variant={toastState.variant}
          position={toastState.position}
          onClose={handleClose}
          autoCloseAfterMs={toastState.autoCloseAfterMs ?? TOAST_AUTO_CLOSE_MS}
        >
          {toastState.message}
        </Toast>
      )}
    </ToastContext>
  );
}
