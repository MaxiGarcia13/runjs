import type { CollapsibleTriggerProps } from './types';
import { cn } from '@maxigarcia/js-utils';
import { ChevronDownIcon } from '@/assets/icons/chevron-down';
import { useCollapsible } from './collapsible-context';

export function CollapsibleTrigger({
  children,
  className,
  onClick,
  ...props
}: CollapsibleTriggerProps) {
  const { open, toggle, contentId, triggerId } = useCollapsible();

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
        toggle();
        event.stopPropagation();
      }}
      className={cn('flex w-full items-center gap-1 text-left cursor-pointer', className)}
      {...props}
    >
      <ChevronDownIcon
        aria-hidden
        className={cn(
          'size-4 shrink-0 transition-transform mb-1',
          open && 'rotate-180',
        )}
      />
      {children}
    </button>
  );
}
