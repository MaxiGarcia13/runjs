import type { CollapsibleContextValue } from './types';
import { createContext, use } from 'react';

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

export function useCollapsible() {
  const context = use(CollapsibleContext);

  if (!context) {
    throw new Error('Collapsible components must be used within Collapsible');
  }

  return context;
}
