import type { ReactNode } from 'react';
import { cn } from '@/utils/classes';

export type AlertVariant = 'default';

const variantStyles: Record<AlertVariant, string> = {
  default: 'border-gray-700 bg-gray-800 text-gray-200',
};

export interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  className?: string;
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border p-2 text-sm',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
