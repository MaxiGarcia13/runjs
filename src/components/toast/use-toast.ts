import type { ToastContextValue } from './types';
import { createContext, use } from 'react';
import { store } from './store';

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = use(ToastContext);
  return context ?? store;
}
