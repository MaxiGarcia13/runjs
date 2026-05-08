import type { TooltipPosition } from './tooltip';
import { cn } from '@maxigarcia/js-utils';
import { Tooltip } from './tooltip';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
}

export function Button({
  children,
  className,
  tooltip,
  tooltipPosition = 'bottom',
  ...props
}: ButtonProps) {
  if (tooltip) {
    return (
      <Tooltip content={tooltip} position={tooltipPosition}>
        <BaseButton className={className} {...props}>{children}</BaseButton>
      </Tooltip>
    );
  }

  return <BaseButton className={className} {...props}>{children}</BaseButton>;
}

export function BaseButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={
        cn(
          'border p-2 rounded-md text-sm flex items-center gap-2',
          'bg-transparent border-gray-600 hover:bg-gray-600',
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
