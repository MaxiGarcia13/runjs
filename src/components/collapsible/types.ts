import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  contentId: string;
  triggerId: string;
}

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}
