import type { ReactNode } from 'react';
import { cn } from '@maxigarcia/js-utils';

export type AlertVariant = 'default';

const variantStyles: Record<AlertVariant, string> = {
  default: 'border-gray-600 bg-gray-700 text-inherit',
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
