import type { CollapsibleContentProps } from './types';
import { useCollapsible } from './collapsible-context';

export function CollapsibleContent({
  children,
  className,
  ...props
}: CollapsibleContentProps) {
  const { open, contentId, triggerId } = useCollapsible();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!open}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
