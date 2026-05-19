import type { TooltipPlacement } from './tooltip/types';
import { cn } from '@maxigarcia/js-utils';
import { Tooltip } from './tooltip';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  tooltipPosition?: TooltipPlacement;
  variant?: 'default' | 'success';
}

export function Button({
  children,
  className,
  tooltip,
  tooltipPosition = 'bottom',
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const accessibleName = ariaLabel ?? (typeof tooltip === 'string' ? tooltip : undefined);

  if (tooltip) {
    return (
      <Tooltip content={tooltip} placement={tooltipPosition}>
        <BaseButton className={className} aria-label={accessibleName} {...props}>{children}</BaseButton>
      </Tooltip>
    );
  }

  return <BaseButton className={className} aria-label={accessibleName} {...props}>{children}</BaseButton>;
}

export function BaseButton({ children, className, variant = 'default', ...props }: ButtonProps) {
  const variantStyles = {
    default: 'bg-transparent border-line hover:bg-surface',
    success: 'border-success bg-success! text-inherit',
  };

  const variantStyle = variantStyles[variant];

  return (
    <button
      className={
        cn(
          'border p-2 rounded-md text-sm flex items-center gap-2',
          variantStyle,
          !props.disabled
            ? 'cursor-pointer  transition-colors'
            : 'opacity-50 cursor-not-allowed hover:bg-transparent',
          className,
        )
      }
      {...props}
    >
      {children}
    </button>
  );
}
