import type { ToastContextValue, ToastState } from './types';

const initialState: ToastState = {
  visible: false,
  message: '',
  variant: 'default',
  position: 'top-right',
};

const listeners = new Set<(state: ToastState) => void>();
let state: ToastState = { ...initialState };

export function getState(): ToastState {
  return state;
}

function setState(next: Partial<ToastState>) {
  state = { ...state, ...next };
  listeners.forEach(listener => listener(state));
}

export function subscribe(listener: (state: ToastState) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const store: ToastContextValue = {
  showToast(message, options) {
    setState({
      visible: true,
      message,
      variant: options?.variant ?? 'default',
      position: options?.position ?? 'top-right',
      autoCloseAfterMs: options?.autoCloseAfterMs,
      onClose: options?.onClose,
    });
  },
  hideToast() {
    const { onClose } = state;
    setState({ visible: false, onClose: undefined });
    onClose?.();
  },
};
