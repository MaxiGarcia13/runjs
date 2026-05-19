import type { CollapsibleContentProps } from './types';
import { useCollapsible } from './collapsible-context';

export function CollapsibleContent({
  children,
  className,
  ...props
}: CollapsibleContentProps) {
  const { open, contentId } = useCollapsible();

  return (
    <div
      id={contentId}
      hidden={!open}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
