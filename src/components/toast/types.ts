import type { AlertVariant } from '../alert';

export type ToastVariant = AlertVariant;

export type ToastPosition
  = | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface ShowToastOptions {
  variant?: ToastVariant;
  autoCloseAfterMs?: number;
  /** Fixed position of the toast. Defaults to `top-right`. */
  position?: ToastPosition;
  /** Called when the toast is closed (by user or auto-close). */
  onClose?: () => void;
}

export interface ToastState {
  visible: boolean;
  message: string;
  variant: ToastVariant;
  position: ToastPosition;
  autoCloseAfterMs?: number;
  onClose?: () => void;
}

export interface ToastContextValue {
  showToast: (message: string, options?: ShowToastOptions) => void;
  hideToast: () => void;
}
